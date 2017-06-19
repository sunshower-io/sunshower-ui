import {
    ElementFactory,
    ElementFactoryProvider,
    ElementLoader
} from "lib/designer/canvas/palette";



import {HasliOrchestrationTemplateProviderFactory} from "./sunshower/sunshower-orchestration-template";
import {NomadOrchestrationTemplateProviderFactory} from "./nomad/nomad-orchestration-template";
import {KubernetesOrchestrationTemplateProviderFactory} from "./kubernetes/kubernetes-orchestration-template";
import {DockerOrchestrationTemplateProviderFactory} from "./docker/docker-orchestration-template";


export class OrchestrationProviderFactory implements ElementFactoryProvider {

    icon : string = 'mdi-cloud-outline';

    load(): Promise<ElementFactory[]> {
        return Promise.resolve([
            new NomadOrchestrationTemplateProviderFactory(),
            new HasliOrchestrationTemplateProviderFactory(),
            new DockerOrchestrationTemplateProviderFactory(),
            new KubernetesOrchestrationTemplateProviderFactory()
        ]);
    }
}
