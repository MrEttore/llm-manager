import type { Request, Response } from 'express';

export type ImageGenerationRequestBody = {
  prompt: string;
  model?: 'gpt-image-1-mini' | 'gpt-image-1' | 'gpt-image-1.5';
  n?: number;
  size?: '1024x1024' | '1536x1024' | '1024x1536' | 'auto';
  quality?: 'low' | 'medium' | 'high' | 'auto';
};

export type ImageGenerationResponseBody = {
  url: string;
  meta: {
    created: number;
    size: '1024x1024' | '1536x1024' | '1024x1536' | undefined;
    quality: 'low' | 'medium' | 'high' | undefined;
    outputFormat: 'png' | 'webp' | 'jpeg' | undefined;
  };
};

export type ImageGenerationRequest = Request<Record<string, never>, ImageGenerationResponseBody, ImageGenerationRequestBody>;
export type ImageGenerationResponse = Response<ImageGenerationResponseBody>;
