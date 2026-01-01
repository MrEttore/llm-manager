import type { NextFunction } from 'express';

import type { ChatCompletionRequest, ChatCompletionResponse } from '@/features/openai/dtos/chatDto.js';
import { ChatService } from '@/features/openai/services/chatService.js';

const chatService = new ChatService();

export const generateChatCompletion = async (req: ChatCompletionRequest, res: ChatCompletionResponse, next: NextFunction) => {
  try {
    const { model, messages } = req.body;

    const completion = await chatService.generateCompletion({ model, messages });

    res.status(200).json(completion);
  } catch (error) {
    next(error);
  }
};

export const streamChatCompletion = async (req: ChatCompletionRequest, res: ChatCompletionResponse, next: NextFunction) => {
  // const abortController = new AbortController();
  let started = false;

  try {
    const { model, messages } = req.body;

    req.socket.setTimeout(0);
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache, no-transform');
    res.setHeader('Connection', 'keep-alive');

    res.flushHeaders?.();

    for await (const chunk of chatService.streamCompletion({ model, messages /*, signal? */ })) {
      if (!started) started = true;

      // SSE format
      res.write(`data: ${JSON.stringify(chunk)}\n\n`);
    }

    res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
    if (!res.writableEnded) res.end();
  } catch (error: unknown) {
    if (started) {
      try {
        const message = error instanceof Error ? error.message : typeof error === 'string' ? error : 'stream error';
        res.write(`event: error\ndata: ${JSON.stringify({ message })}\n\n`);
      } catch {
        if (!res.writableEnded) res.end();
      }
      if (!res.writableEnded) res.end();
      return;
    }

    next(error);
  }
};
