import OpenAI from 'openai';

import { ENV } from '@/config/env.js';
import type { GenerateImageBytesParams, GenerateImageBytesResult } from '@/features/openai/domain/image.js';

export class ImageService {
  private client: OpenAI;

  constructor() {
    this.client = new OpenAI({ apiKey: ENV.openaiApiKey });
  }

  /**
   * Generates image bytes and provider metadata from an OpenAI image generation request.
   *
   * This method invokes the OpenAI Images API and returns the binary data for the generated image, along with selected metadata from the provider.
   *
   * @param prompt - Text prompt describing the image to generate.
   * @param model - The image model to use. Defaults to 'gpt-image-1-mini'.
   * @param n - Number of images to request from the provider. Defaults to 1.
   * @param quality - Desired quality of the output image ('low' | 'medium' | 'high'). Defaults to 'low'.
   * @param size - Target resolution in 'WIDTHxHEIGHT' format (e.g., '1024x1024'). Defaults to '1024x1024'.
   *
   * @returns A promise that resolves to an object containing:
   * - imageBytes: A Node.js Buffer with the binary data of the generated image.
   * - meta: Provider metadata including `created`, `size`, `quality`, and `outputFormat`.
   *
   * @throws {Error} If the provider response does not include image data.
   *
   * @example
   * const { imageBytes, meta } = await imageService.generateImageBytes({
   *   prompt: 'A watercolor painting of a fox in a forest',
   *   model: 'gpt-image-1-mini',
   *   quality: 'high',
   *   size: '1024x1024',
   * });
   */
  async generateImageBytes({
    prompt,
    model = 'gpt-image-1-mini',
    n = 1,
    quality = 'low',
    size = '1024x1024',
  }: GenerateImageBytesParams): Promise<GenerateImageBytesResult> {
    try {
      const response = await this.client.images.generate({
        prompt,
        model,
        n,
        quality,
        size,
      });

      const imageBase64 = response?.data?.[0]?.b64_json ?? null;
      if (!imageBase64) throw new Error('OpenAI returned no image data');

      const imageBytes = Buffer.from(imageBase64, 'base64');

      const meta = {
        created: response.created,
        size: response.size,
        quality: response.quality,
        outputFormat: response.output_format,
      };

      return {
        imageBytes,
        meta,
      };
    } catch (error) {
      console.error('The OpenAI image service had an error generating the image: ', error);
      // TODO: Enhance error handling.
      throw error;
    }
  }
}
