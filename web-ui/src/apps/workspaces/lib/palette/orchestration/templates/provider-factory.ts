import {
    doLoad,
    ElementFactory,
    ElementFactoryProvider
} from "lib/designer/canvas/palette";



import {NomadOrchestrationTemplateProviderFactory} from "./nomad/nomad-orchestration-template";
import {KubernetesOrchestrationTemplateProviderFactory} from "./kubernetes/kubernetes-orchestration-template";
import {DockerOrchestrationTemplateProviderFactory} from "./docker/docker-orchestration-template";
import {Canvas} from "lib/designer/canvas/canvas";


export class OrchestrationProviderFactory implements ElementFactoryProvider {

    icon : string = 'mdi-cloud-outline';

    load(): Promise<ElementFactory[]> {
        return Promise.resolve([
            new NomadOrchestrationTemplateProviderFactory(),
            new DockerOrchestrationTemplateProviderFactory(),
            new KubernetesOrchestrationTemplateProviderFactory()
        ]);
    }

    register(canvas: Canvas): Promise<Canvas> {
        return doLoad(this, canvas);
    }
}
