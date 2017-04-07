export * from './lang/class';

export interface Identifier {
    id              : string;
    version         : number;
}


export module Identifier {
    export function isIdentifier(key:string) : boolean {
        return key && /[0-9a-zA-Z]{22}/.test(key);
    }

}

export class Exception implements Error {
    public name: string;
    public message: string;

    constructor(message?: string) {

    }
}


export class IllegalStateException extends Exception {

}
