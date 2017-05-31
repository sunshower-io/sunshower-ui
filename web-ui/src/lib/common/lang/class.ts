export type Class<T> = {new(...args:any[]) : T};

export function getClass<T>(t:T) : Class<T> {
    let a = t.constructor;
    return <Class<T>> a;
}

export interface Copyable<T> {
    copy() : T;

}
