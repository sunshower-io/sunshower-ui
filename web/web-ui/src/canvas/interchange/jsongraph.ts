import {Graph} from "algorithms/graph/graph";
import {Element} from 'canvas/element/element';
import {Marshaller, Unmarshaller} from "./interchange";


export class JSONGraphMarshaller implements Marshaller<Graph<Element>> {
    marshall(element: Graph<Element>): string {
        return undefined;
    }
}

export class JSONGraphUnmarshaller implements Unmarshaller<Graph<Element>> {

    unmarshall(value: string): Graph<Element> {
        return undefined;
    }

}
