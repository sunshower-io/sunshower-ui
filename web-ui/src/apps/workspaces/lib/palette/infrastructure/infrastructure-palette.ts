import {
    ElementFactory,
    ElementFactoryProvider
} from "lib/designer/canvas/palette";
import {
    ComputeNodeTemplateElementFactory
} from "./compute-node-template";
import {
    SecurityGroupElementFactory
} from "./security-group";



export class InfrastructureFactoryProvider implements ElementFactoryProvider {
    load(): Promise<ElementFactory[]> {
        return Promise.resolve([
            new ComputeNodeTemplateElementFactory(),
            new SecurityGroupElementFactory()
        ]);
    }
}