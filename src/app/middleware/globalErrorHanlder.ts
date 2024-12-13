import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import config from '../config';
import handleZodError from '../errors/handle-zod.eror';
import { TErrorSource } from '../interfaces/error';
import handleValidationError from '../errors/handle-mongoose-validation.error';
import handleCastError from '../errors/handle-cast.error';
import handleDuplicateError from '../errors/handleDuplicate.error';
import AppError from '../errors/AppError';

const globalErrorHandler: ErrorRequestHandler = (err: any, req, res, next) => {
  //setting  default error
  let statusCode = 500;
  let message ='Something went wrong';

  let errorSources: TErrorSource = [
    {
      path: '',
      message: 'something went wrong',
    },
  ];

  if (err instanceof ZodError) {
    const simpleFydError = handleZodError(err);

    statusCode = simpleFydError?.statusCode;
    message = simpleFydError?.message;
    errorSources = simpleFydError?.errorSources;
    // console.log(simpleFydError);
  } else if (err?.name === 'ValidationError') {
    const simpleFydError = handleValidationError(err);

    statusCode = simpleFydError?.statusCode;
    message = simpleFydError?.message;
    errorSources = simpleFydError?.errorSources;
  } else if (err?.name === 'CastError') {
    const simpleFydError = handleCastError(err);

    statusCode = simpleFydError?.statusCode;
    message = simpleFydError?.message;
    errorSources = simpleFydError?.errorSources;
  } else if (err?.code === 11000) {
    const simpleFydError = handleDuplicateError(err);

    statusCode = simpleFydError?.statusCode;
    message = simpleFydError?.message;
    errorSources = simpleFydError?.errorSources;
  } else if (err instanceof AppError) {
    statusCode = err?.statusCode;
    message = err?.message;
    errorSources =[{
      path: '',
      message: err?.message, 
    }];
  }
  else if (err instanceof Error) {
    message = err?.message;
    errorSources =[{
      path: '',
      message: err?.message, 
    }];
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    stack: config.NODE_ENV === 'development' ? err?.stack : null,
    // error: err,
  });
};

export default globalErrorHandler;

//pattern
/* 
  success
  message
  errorSources: [
    path:'',
    message: ''
  ]
  stack
 */
