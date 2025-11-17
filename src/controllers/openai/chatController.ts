import type { NextFunction, Response } from 'express';

import { OpenAIService } from '@/services/openai/openaiService.js';
import type { ChatCompletionRequest, ChatCompletionResponse } from '@/types/chat.js';

const service = new OpenAIService();

export const getChatCompletion = async (req: ChatCompletionRequest, res: ChatCompletionResponse, next: NextFunction) => {
  try {
    const { model, messages } = req.body;
    const completion = await service.chat(model, messages);
    res.status(200).json(completion);
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/v1/openai/chat/stream
 *
 * Body: { model: string, messages: ChatMessage[] }
 *
 * Response: SSE stream of ChatCompletionResult (as data: <json>\n\n per event)
 */
export const streamChatCompletion = async (req: ChatCompletionRequest, res: Response, next: NextFunction) => {
  // const abortController = new AbortController();
  let started = false;

  try {
    const { model, messages } = req.body;

    req.socket.setTimeout(0);
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache, no-transform');
    res.setHeader('Connection', 'keep-alive');

    res.flushHeaders?.();

    for await (const chunk of service.streamChat(model, messages /*, signal? */)) {
      if (!started) started = true;

      // SSE format
      res.write(`data: ${JSON.stringify(chunk)}\n\n`);
    }

    res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
    if (!res.writableEnded) res.end();
  } catch (error: any) {
    if (started) {
      try {
        res.write(`event: error\ndata: ${JSON.stringify({ message: error?.message ?? 'stream error' })}\n\n`);
      } catch {}
      if (!res.writableEnded) res.end();
      return;
    }

    next(error);
  }
};
