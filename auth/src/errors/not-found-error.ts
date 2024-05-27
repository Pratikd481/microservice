import { CustomError } from "./custom-error";

export class NotfoundError extends CustomError {
    statusCode: number = 404;

    constructor() {
        super("Route not found");
        Object.setPrototypeOf(this, NotfoundError.prototype);
    }

    serializeErrors(): { message: string; field?: string | undefined }[] {
        return [{ message: "Not found " }];
    }
}
