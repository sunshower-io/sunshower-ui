export interface Service<T> {

    bind(key:string) : Promise<T>;
}