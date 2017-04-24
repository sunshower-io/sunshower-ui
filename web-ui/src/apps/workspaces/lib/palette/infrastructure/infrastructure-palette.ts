import {
    ElementFactory,
    ElementFactoryProvider
} from "lib/designer/canvas/palette";
// import {ComputeNodeTemplateElement} from "./compute-node-template";



export class InfrastructureFactoryProvider implements ElementFactoryProvider {

    load(): Promise<ElementFactory[]> {
        return null;
        // return Promise.resolve([new ComputeNodeTemplateElementFactory()]);
    }

}