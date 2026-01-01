import type { Request, Response } from 'express';

import type { ChatMessage } from '@/features/openai/domain/chat.js';

export type ChatCompletionRequestBody = {
  model: string;
  messages: ChatMessage[];
};

export type ChatCompletionResponseBody = {
  role: 'assistant';
  content: string | null;
};

export type ChatCompletionRequest = Request<Record<string, never>, ChatCompletionResponseBody, ChatCompletionRequestBody>;
export type ChatCompletionResponse = Response<ChatCompletionResponseBody>;
