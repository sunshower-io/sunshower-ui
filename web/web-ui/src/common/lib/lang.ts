export * from './lang/class';

export class Exception implements Error {
    public name: string;
    public message: string;

    constructor(message?: string) {

    }
}


export class IllegalStateException extends Exception {

}
