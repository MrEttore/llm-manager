// import { NextFunction } from 'express';
// import { TypedRequest } from '../types/requestTypes.js';
// import { TypedResponse } from '../types/responseTypes.js';

// export function catchAsync<ReqBody = unknown, ResBody = unknown>(
//   fn: (req: TypedRequest<ReqBody>, res: TypedResponse<ResBody>, next: NextFunction) => Promise<unknown>,
// ) {
//   return (req: TypedRequest<ReqBody>, res: TypedResponse<ResBody>, next: NextFunction) => {
//     fn(req, res, next).catch((err) => {
//       next(err);
//     });
//   };
// }
