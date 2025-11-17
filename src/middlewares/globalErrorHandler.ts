import type { NextFunction, Request, Response } from 'express';

import { AppError } from '@/errors/AppError.js';

export const globalErrorHandler = (err: unknown, req: Request, res: Response, next: NextFunction) => {
  let error: AppError;
  err instanceof AppError ? (error = err) : (error = new AppError('Internal Server Error', 500));

  res.status(error.statusCode).json({
    error: {
      code: error.statusCode,
      message: error.message,
    },
  });
};
