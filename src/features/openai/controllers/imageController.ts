import type { NextFunction } from 'express';

import type { ImageGenerationRequest, ImageGenerationResponse } from '@/features/openai/dtos/imageDto.js';
import { ImageService } from '@/features/openai/services/imageService.js';
import { StorageService } from '@/shared/storage/storageService.js';

const imageService = new ImageService();
const storageService = new StorageService();

export const generateImage = async (req: ImageGenerationRequest, res: ImageGenerationResponse, next: NextFunction) => {
  try {
    const { prompt, model, n, quality, size } = req.body;

    const { imageBytes, meta } = await imageService.generateImageBytes({ prompt, model, n, quality, size });
    const { url } = await storageService.uploadImage({ imageBytes });

    res.status(200).json({ url, meta });
  } catch (error) {
    next(error);
  }
};
