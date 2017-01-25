
export interface Marshaller<T> {
    write(data:T) : Map<string, any>;
}

export interface Unmarshaller<T> {
    read(data:Map<string, any>) : T;
}