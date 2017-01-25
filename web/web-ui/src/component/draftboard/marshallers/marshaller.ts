import {Marshaller} from "io/marshalling/marshaller";
import {Draftboard} from "component/draftboard/draftboard";
import {
    TarjansStronglyConnectedComponents
} from "algorithms/graph/tarjans";

export default class DraftboardMarshaller
    implements Marshaller<Draftboard> {


    write(data: Draftboard): Map<string, any> {
        let tarjans = new TarjansStronglyConnectedComponents(),
            results = tarjans.run(data);
        if(results.hasCycles()) {
            throw new Error("Cycles detected" + results.getCycles());
        }
        return new Map<string, any>();
    }


}