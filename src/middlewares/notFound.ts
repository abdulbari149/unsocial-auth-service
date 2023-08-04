import { NextFunction, Request, Response } from 'express';
import ApiError from '@/helpers/ApiError';
import httpStatus from 'http-status';

const notFound = (req: Request, _res: Response, next: NextFunction) => {
  next(
    new ApiError(
      httpStatus.NOT_FOUND,
      `Route with URL: ${req.url} and ${req.method} doesn't exists`
    )
  );
};

export default notFound;
