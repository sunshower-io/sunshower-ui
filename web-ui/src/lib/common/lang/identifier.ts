
export module Identifier {
    export function isIdentifier(key:string) : boolean {
        return key && /[0-9a-zA-Z]{22}/.test(key);
    }

}
