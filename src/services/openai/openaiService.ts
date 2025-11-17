import OpenAI from 'openai';

import { ENV } from '@/config/env.js';
import type { ChatCompletion, ChatCompletionChunk, ChatMessage } from '@/types/chat.js';

export class OpenAIService {
  private client: OpenAI;

  constructor() {
    this.client = new OpenAI({ apiKey: ENV.openaiApiKey });
  }

  /**
   * Get a chat completion from OpenAI.
   *
   * @param model  model ID (e.g. 'gpt-4o-mini')
   * @param messages  array of prior messages
   */
  async chat(model: string, messages: ChatMessage[]): Promise<ChatCompletion> {
    try {
      const response = await this.client.chat.completions.create({
        model,
        messages,
      });
      const completion = response.choices?.[0]?.message;

      const chatCompletion: ChatCompletion = { role: completion?.role ?? 'assistant', content: completion?.content ?? null };
      return chatCompletion;
    } catch (error) {
      // TODO: Handle provider‑specific errors
      throw error;
    }
  }

  /**
   * Stream chat completions from OpenAI.
   *
   * @param model  model ID (e.g. 'gpt-4o-mini')
   * @param messages  array of prior messages
   * @param signal  optional AbortSignal to cancel the request
   */
  async *streamChat(model: string, messages: ChatMessage[], signal?: AbortSignal): AsyncGenerator<ChatCompletionChunk> {
    try {
      const stream = await this.client.chat.completions.create(
        {
          model,
          messages,
          stream: true,
        },
        { signal },
      );

      for await (const chunk of stream) {
        const delta = chunk.choices[0]?.delta;
        if (delta) {
          const chatCompletionChunk: ChatCompletionChunk = { role: delta?.role ?? 'assistant', content: delta?.content ?? null };
          yield chatCompletionChunk;
        }
      }
    } catch (error) {
      console.error('Error in streamChat:', error);
      // TODO: Handle provider‑specific errors
      throw error;
    }
  }
}
