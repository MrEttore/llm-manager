import { AppError } from '@/errors/AppError.js';

export class ValidationError extends AppError {
  constructor(message: string) {
    super(message, 400);
  }
}
