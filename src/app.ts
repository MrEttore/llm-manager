import type { Request, Response } from 'express';
import express from 'express';
import morgan from 'morgan';

import { corsBasic, corsPreflight } from '@/config/cors.js';
import { ENV } from '@/config/env.js';
import { openaiRouter } from '@/features/openai/openaiRouter.js';
import { globalErrorHandler } from '@/shared/middlewares/globalErrorHandler.js';
import { notFoundHandler } from '@/shared/middlewares/notFoundHandler.js';

export const app = express();

// Middlewares

app.use(corsBasic);
app.options('*', corsPreflight);

if (ENV.nodeEnv === 'development') app.use(morgan('dev'));
if (ENV.nodeEnv === 'production') app.use(morgan('combined'));

app.use(express.json());

// Mount routes

app.get('/', (req: Request, res: Response) => {
  res.send('⚡️ Llm manager is running');
});

app.use('/api/v1/openai', openaiRouter);

app.all('*', notFoundHandler);
app.use(globalErrorHandler);
