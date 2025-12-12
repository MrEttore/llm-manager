import { Router } from 'express';

import { getChatCompletion, streamChatCompletion } from '@/controllers/openai/chatController.js';
import { generateImage } from '@/controllers/openai/imageController.js';

export const openaiRouter = Router();

openaiRouter.post('/chat/completion', getChatCompletion);
openaiRouter.post('/chat/stream', streamChatCompletion);
openaiRouter.post('/image', generateImage);
