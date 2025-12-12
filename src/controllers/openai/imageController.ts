import type { NextFunction } from 'express';

import { OpenAIService } from '@/services/openai/openaiService.js';
import type { ImageGenerationRequest, ImageGenerationResponse } from '@/types/image.js';

const service = new OpenAIService();

export const generateImage = async (req: ImageGenerationRequest, res: ImageGenerationResponse, next: NextFunction) => {
  try {
    const { prompt, model, n, quality, size } = req.body;

    const { dataUrl, meta } = await service.image(prompt, model, n, quality, size);

    res.status(200).json({ image: dataUrl, meta });
  } catch (error) {
    next(error);
  }
};
