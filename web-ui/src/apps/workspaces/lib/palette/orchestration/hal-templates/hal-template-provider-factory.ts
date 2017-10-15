import {
    doLoad,
    ElementFactory,
    ElementFactoryProvider,
} from "lib/designer/canvas/palette";
import {
    ComputeNodeTemplateElementFactory
} from "apps/workspaces/lib/palette/infrastructure/compute-node-template";


import {
    ClusterTemplateElementFactory
} from "apps/workspaces/lib/palette/infrastructure/cluster-template";

import {
    CJETemplateElementFactory
} from "apps/workspaces/lib/palette/cje/cje-template-element";
import {Canvas} from "lib/designer/canvas/canvas";

import {
    ScriptTemplateElementFactory
} from "apps/workspaces/lib/palette/orchestration/scripts/scripts";



export class HALTemplateProviderFactory implements ElementFactoryProvider {

    icon : string = 'mdi-cloud-sync';

    load(): Promise<ElementFactory[]> {
        return Promise.resolve([
            new CJETemplateElementFactory(),
            new ClusterTemplateElementFactory(),
            new ComputeNodeTemplateElementFactory(),
            new ScriptTemplateElementFactory(),
        ]);
    }
    
    
    register(canvas: Canvas) : Promise<Canvas> {
        return doLoad(this, canvas);
    }
}