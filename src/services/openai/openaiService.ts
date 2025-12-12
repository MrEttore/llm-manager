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
      console.error('Error in chat:', error);
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

  async image(
    prompt: string,
    model?: string,
    n?: number,
    quality?: 'auto' | 'low' | 'medium' | 'high',
    size?: '1024x1024' | '1536x1024' | '1024x1536',
  ) {
    try {
      const result = await this.client.images.generate({
        prompt,
        model: model ?? 'gpt-image-1',
        n: n ?? 1,
        quality: quality ?? 'auto',
        size: size ?? '1024x1024',
      });

      const image_base64 = result?.data?.[0]?.b64_json ?? null;
      const dataUrl = `data:image/png;base64,${image_base64}`;
      const meta = {
        created: result.created,
        size: result.size,
        quality: result.quality,
        outputFormat: result.output_format ?? 'png',
      };

      return {
        dataUrl,
        meta,
      };
    } catch (error) {
      console.error('The OpenAIService had an error generating the image: ', error);
      // TODO: Handle provider‑specific errors
      throw error;
    }
  }
}
