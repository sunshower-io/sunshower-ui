import {Encoder} from "./json-codec";
import {Class} from "lib/common/lang/class";
import {Canvas} from "lib/designer/canvas/canvas";
import {
    ElementFactoryProvider,
    ElementLoader
} from "lib/designer/canvas/palette";
import {TaskGraph} from "lib/designer/model/graph/graph-element";
export interface Codec {

    register<T>(type: Class<T>, encoder: Encoder<T>)

    registerLoader(
        key: string,
        loader:ElementLoader
    ) : void ;

    registerProviderFactory(
        key: string,
        factory:ElementFactoryProvider
    ) : void;

    import(canvas: Canvas, graph: TaskGraph): void;
}