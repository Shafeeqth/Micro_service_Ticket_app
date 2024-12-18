import { CustomError } from "./custom-errors";

export class BadRequestError extends CustomError {
    statusCode = 404;

    constructor(public message: string) {
        super(message);
    
        Object.setPrototypeOf(this, BadRequestError.prototype);
    }

    serializeErrors(): { message: string; field?: string; }[] {
        return [{message: this.message}];
    }


}