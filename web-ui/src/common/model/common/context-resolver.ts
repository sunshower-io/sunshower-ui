import {Container} from "aurelia-dependency-injection";
import {PipelineStep} from "aurelia-router";
import {NavigationInstruction} from "aurelia-router";
import {Next} from "aurelia-router";
import {ServiceManager} from "./service-manager";
export class ContextResolver implements PipelineStep {

    private readonly serviceManager: ServiceManager;

    constructor(private container:Container) {
        this.serviceManager = container.get(ServiceManager);
    }

    run(instruction: NavigationInstruction, next: Next): Promise<any> {
        return Promise.all(
            this.serviceManager.bindServices(instruction.params)
        ).then(t => next());
    }
}