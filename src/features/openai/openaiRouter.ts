import { Router } from 'express';

import { generateChatCompletion, streamChatCompletion } from '@/features/openai/controllers/chatController.js';
import { generateImage } from '@/features/openai/controllers/imageController.js';

export const openaiRouter = Router();

openaiRouter.post('/chat/completion', generateChatCompletion);
openaiRouter.post('/chat/stream', streamChatCompletion);
openaiRouter.post('/image', generateImage);
