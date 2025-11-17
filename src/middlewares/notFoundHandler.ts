import type { NextFunction,Request, Response } from 'express';

import { AppError } from '@/errors/AppError.js';

export const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server.`, 404));
};
