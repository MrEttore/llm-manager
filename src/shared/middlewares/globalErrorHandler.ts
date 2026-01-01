import type { NextFunction, Request, Response } from 'express';

import { AppError } from '@/shared/errors/AppError.js';

export const globalErrorHandler = (err: unknown, req: Request, res: Response, _next: NextFunction) => {
  const error = err instanceof AppError ? err : new AppError('Internal Server Error', 500);

  res.status(error.statusCode).json({
    error: {
      code: error.statusCode,
      message: error.message,
    },
  });
};
