export abstract class CustomError extends Error {
    abstract statusCode: number;
    constructor(message: string){
        super(message);
        Object.setPrototypeOf(this, CustomError.prototype);
    }
    
    abstract serializeErrors(): Array<Pick<{ message: string; field?: string }, 'message' | 'field'>>
}
