import HTTP_STATUS from 'http-status-codes';
import { ValidationError } from 'joi';

export interface IErrorResponse {
  message: string;
  statusCode: number;
  status: string;
  serializeErrors(): IError;
}


export interface IError {
  errors: {
    message: string;
  }[];
  statusCode: number;
  status: string;
}

export abstract class CustomError extends Error {
  abstract statusCode: number;
  abstract status: string;

  constructor(message: string) {
    super(message);
  }

  serializeErrors(): IError {
    return {
      errors: [{ message: this.message }],
      status: this.status,
      statusCode: this.statusCode
    };
  }
}

// export class JoiRequestValidationError extends CustomError {
//   statusCode = HTTP_STATUS.BAD_REQUEST;
//   status = 'error';

//   constructor(message: string) {
//     super(message);
//   }
// }

export class BadRequestError extends CustomError {
  statusCode = HTTP_STATUS.BAD_REQUEST;
  status = 'error';

  constructor(message: string) {
    super(message);
  }
}

export class NotFoundError extends CustomError {
  statusCode = HTTP_STATUS.NOT_FOUND;
  status = 'error';

  constructor(message: string) {
    super(message);
  }
}

export class UnauthorizedError extends CustomError {
  statusCode = HTTP_STATUS.UNAUTHORIZED;
  status = 'error';

  constructor(message: string) {
    super(message);
  }
}

export class FileTooLargeError extends CustomError {
  statusCode = HTTP_STATUS.REQUEST_TOO_LONG;
  status = 'error';

  constructor(message: string) {
    super(message);
  }
}

export class ServerError extends CustomError {
  statusCode = HTTP_STATUS.SERVICE_UNAVAILABLE;
  status = 'error';

  constructor(message: string) {
    super(message);
  }
}


export class JoiRequestValidationError extends Error {
  statusCode = HTTP_STATUS.BAD_REQUEST;
  status = 'error';

  constructor(public error: ValidationError ) {
    super();

    Object.setPrototypeOf(this, JoiRequestValidationError.prototype);
  }

  serializeErrors() {
    return {
      statusCode: this.statusCode,
      status: this.status,
      errors: this.error.details.map((err) => {
        return { message: err.message, field: err.context?.key };
      })
    };
  }
}
