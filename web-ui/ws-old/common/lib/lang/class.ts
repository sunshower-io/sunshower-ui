export type Class<T> = {new(...args:any[]) : T};



export interface Copyable<T> {
    copy() : T;

}