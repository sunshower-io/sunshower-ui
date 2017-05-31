import {
    ElementFactory,
    ElementFactoryProvider, ElementLoader
} from "lib/designer/canvas/palette";
import {
    ComputeNodeTemplateElementFactory
} from "./compute-node-template";
import {
    SecurityGroupElementFactory
} from "./security-group";



export class InfrastructureFactoryProvider implements ElementFactoryProvider {

    icon: string = "mdi-chip";

    resolveElementLoader(key: string): ElementLoader {
        return undefined;
    }

    load(): Promise<ElementFactory[]> {
        return Promise.resolve([
            new ComputeNodeTemplateElementFactory(),
            new SecurityGroupElementFactory()
        ]);
    }
}