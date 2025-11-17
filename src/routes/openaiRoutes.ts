import { Router } from 'express';

import { getChatCompletion, streamChatCompletion } from '@/controllers/openai/chatController.js';

export const openaiRouter = Router();

openaiRouter.post('/chat/completion', getChatCompletion);
openaiRouter.post('/chat/stream', streamChatCompletion);
