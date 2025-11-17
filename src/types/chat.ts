import type { Request, Response } from 'express';

export interface ChatMessage {
  role: 'user' | 'system' | 'assistant';
  content: string;
}

export interface ChatRequestBody {
  model: string;
  messages: ChatMessage[];
}

export interface ChatCompletion {
  role: 'assistant';
  content: string | null;
}

export interface ChatCompletionChunk {
  role: 'user' | 'system' | 'assistant' | 'tool' | 'developer';
  content: string | null;
}

export type ChatCompletionRequest = Request<{}, ChatCompletion, ChatRequestBody>;
export type ChatCompletionResponse = Response<ChatCompletion>;
