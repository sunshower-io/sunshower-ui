import {Graph} from "common/lib/algorithms/graph";
import {Element} from 'common/lib/canvas/element';
import {
    Marshaller,
    Unmarshaller
} from "./interchange";


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
