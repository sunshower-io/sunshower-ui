import {Graph} from "algorithms/graph/graph";

export interface Marshaller<T> {
    marshall(element:T) : string;
}

export interface Unmarshaller<T> {
    unmarshall(value:string) : T;
}

