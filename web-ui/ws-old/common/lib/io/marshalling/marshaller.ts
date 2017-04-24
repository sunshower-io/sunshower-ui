
export interface Marshaller<T> {
    write(data:T) : {};
}

export interface Unmarshaller<T> {
    read(data:Map<string, any>) : T;
}