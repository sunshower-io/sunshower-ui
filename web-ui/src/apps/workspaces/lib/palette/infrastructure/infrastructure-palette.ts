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
import {Canvas} from "lib/designer/canvas/canvas";



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

    register(canvas: Canvas): Promise<Canvas> {
        return undefined;
    }
}