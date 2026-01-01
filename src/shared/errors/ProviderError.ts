import { AppError } from '@/shared/errors/AppError.js';

export class ProviderError extends AppError {
  constructor(message: string, statusCode = 503) {
    super(message, statusCode);
  }
}
