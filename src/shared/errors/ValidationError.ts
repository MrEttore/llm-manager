import { AppError } from '@/shared/errors/AppError.js';

export class ValidationError extends AppError {
  constructor(message: string) {
    super(message, 400);
  }
}
