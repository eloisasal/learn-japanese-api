export abstract class BaseError extends Error {
    public statusCode: number = 500;

    constructor(message: string) {
        super(message);

        // assign the error class name in your custom error (as a shortcut)
        this.name = this.constructor.name;

        // capturing the stack trace keeps the reference to your error class
        Error.captureStackTrace(this, this.constructor);
    }
}

export class InvalidHeadersException extends BaseError {
    constructor(message?: string) {
        super(message ? message : 'Invalid Header Exception');
        this.statusCode = 400;
    }
}

export class AlreadyDeletedException extends BaseError {
    constructor(message?: string) {
        super(message ? message : 'Data is already deleted');
        this.statusCode = 403;
    }
}

export class InvalidParameterException extends BaseError {
    constructor(message?: string) {
        super(
            message ? message : 'query string parameters or body are not valid',
        );
        this.statusCode = 401;
    }
}

export class UrlNotFoundException extends BaseError {
    constructor(message?: string) {
        super(message ? message : 'Url not found Exception');
        this.statusCode = 404;
    }
}

export class NotImplementedException extends BaseError {
    constructor(method?: string) {
        const message = 'Unsupported HTTP method(' + method + ')';
        super(message);
        this.statusCode = 501;
    }
}

export class InternalServerErrorException extends BaseError {
    constructor(message?: string) {
        super(message ? message : 'Internal Server Error');
        this.statusCode = 500;
    }
}
