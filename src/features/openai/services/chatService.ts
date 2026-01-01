import OpenAI from 'openai';

import { ENV } from '@/config/env.js';
import type {
  GenerateCompletionParams,
  GenerateCompletionResult,
  StreamCompletionParams,
  StreamCompletionResult,
} from '@/features/openai/domain/chat.js';

export class ChatService {
  private client: OpenAI;

  constructor() {
    this.client = new OpenAI({ apiKey: ENV.openaiApiKey });
  }

  /**
   * Generates a chat completion using the configured OpenAI client.
   *
   * Sends the specified model and conversation messages to the provider and returns
   * the role and content of the first choice in the response.
   *
   * @param model - The identifier of the chat model to use.
   * @param messages - The ordered list of chat messages that provide conversation context.
   * @returns A promise that resolves to the generated completion containing `role` and `content`.
   * @throws If no completion message is returned by the provider or if the request fails.
   * @remarks Provider-specific errors are logged and rethrown. Callers should handle them appropriately.
   */
  async generateCompletion({ model, messages }: GenerateCompletionParams): Promise<GenerateCompletionResult> {
    try {
      const response = await this.client.chat.completions.create({
        model,
        messages,
      });
      const message = response.choices?.[0]?.message;
      if (!message) throw new Error('OpenAI returned no completion message data');

      const completion = {
        role: message.role,
        content: message.content,
      };

      return completion;
    } catch (error) {
      console.error('The OpenAI chat service had an error generating the chat completion: ', error);
      // TODO: Enhance error handling.
      throw error;
    }
  }

  /**
   * Streams a chat completion and yields partial delta chunks as they arrive.
   *
   * Internally initiates a streamed chat completion request and iterates over the incoming chunks,
   * yielding a `StreamCompletionResult` for each delta received. Each yielded chunk includes:
   * - `role`: the role reported by the delta (defaults to `'assistant'`)
   * - `content`: the text fragment from the delta, or `null` if none is present
   *
   * The stream ends when the provider finishes sending data or when the provided `AbortSignal` is aborted.
   * Errors are logged and rethrown so callers can implement provider‑specific handling.
   *
   * @param model - The model identifier to use for the chat completion.
   * @param messages - The array of chat messages to send as context.
   * @param signal - Optional `AbortSignal` used to cancel the streaming request.
   * @returns An async generator that yields `StreamCompletionResult` values for each delta chunk.
   * @throws Propagates errors from the underlying client or network during streaming.
   */
  async *streamCompletion({ model, messages, signal }: StreamCompletionParams): AsyncGenerator<StreamCompletionResult> {
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
          const completionChunk = { role: delta?.role ?? 'assistant', content: delta?.content ?? null };
          yield completionChunk;
        }
      }
    } catch (error) {
      console.error('The OpenAI chat service had an error generating the stream completion: ', error);
      // TODO: Enhance error handling.
      throw error;
    }
  }
}
