import {Container} from "aurelia-dependency-injection";
import {PipelineStep} from "aurelia-router";
import {NavigationInstruction} from "aurelia-router";
import {Next} from "aurelia-router";
import {ServiceManager} from "./service-manager";
export class ContextResolver implements PipelineStep {

    private readonly serviceManager                 : ServiceManager;

    constructor(
        private container: Container,
    ) {
        this.serviceManager = container.get(ServiceManager);
    }

    run(instruction: NavigationInstruction, next: Next): Promise<any> {
        let instructions = instruction.getAllInstructions(),
            manager = this.serviceManager;

        return instructions.reduce((p: Promise<any>, instr: NavigationInstruction) => {
            return p.then(t => {
                return Promise.all(manager.bindServices(instr.params, instr));
            });
        }, Promise.resolve()).then(t => next());
    }
}