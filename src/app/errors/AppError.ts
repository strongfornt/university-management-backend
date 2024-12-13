class AppError extends Error {
    constructor(
      public statusCode: number,
      message: string,
      stack = '',
    ) {
      super(message);
      if (stack) {
        this.stack = stack;
      } else {
        Error.captureStackTrace(this, this.constructor);
      }
    }
  }


  export default AppError