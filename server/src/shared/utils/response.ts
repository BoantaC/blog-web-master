import { Response } from 'express';

export const respondWithSuccess = (
  response: Response,
  data: any,
  status = 200
): void => {
  response.status(status).json({
    success: true,
    data,
  });
};

export const respondWithError = (
  response: Response,
  error: any,
  status = 400
): void => {
  response.status(status).json({
    success: false,
    error,
  });
};
