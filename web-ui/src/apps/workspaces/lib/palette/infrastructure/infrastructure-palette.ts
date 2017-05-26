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
    resolveElementLoader(key: string): ElementLoader {
        return undefined;
    }

    icon: string = "mdi-chip";

    load(): Promise<ElementFactory[]> {
        return Promise.resolve([
            new ComputeNodeTemplateElementFactory(),
            new SecurityGroupElementFactory()
        ]);
    }
}