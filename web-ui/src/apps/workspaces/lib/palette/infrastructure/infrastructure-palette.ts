import {
    ElementFactory,
    ElementFactoryProvider
} from "lib/designer/canvas/palette";
import {ComputeNodeTemplateElement, ComputeNodeTemplateElementFactory} from "./compute-node-template";



export class InfrastructureFactoryProvider implements ElementFactoryProvider {

    load(): Promise<ElementFactory[]> {
        return Promise.resolve([new ComputeNodeTemplateElementFactory()]);
    }

}