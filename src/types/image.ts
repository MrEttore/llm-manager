import type { Request, Response } from 'express';

export interface ImageGenerationRequestBody {
  prompt: string;
  model?: 'gpt-image-1-mini' | 'gpt-image-1';
  n?: number;
  size?: '1024x1024' | '1536x1024' | '1024x1536';
  quality?: 'auto' | 'low' | 'medium' | 'high';
}

export interface ImageData {
  url?: string;
  b64_json?: string;
}

export interface ImageGenerationResponseBody {
  image: string;
  meta: {
    created: number;
    size: '1024x1024' | '1536x1024' | '1024x1536' | undefined;
    quality: 'low' | 'medium' | 'high' | undefined;
    outputFormat: 'png' | 'webp' | 'jpeg';
  };
}

export type ImageGenerationRequest = Request<Record<string, never>, ImageGenerationResponseBody, ImageGenerationRequestBody>;
export type ImageGenerationResponse = Response<ImageGenerationResponseBody>;
