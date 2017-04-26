import {Next} from "aurelia-router";
import {PipelineStep} from "aurelia-router";
import {ServiceManager} from "./service-manager";
import {NavigationInstruction} from "aurelia-router";
import {Container} from "aurelia-dependency-injection";
import {ApplicationState} from "../storage/application-state";

export class StateResolver implements PipelineStep {

    private readonly applicationState :  ApplicationState;
    constructor(private container: Container) {
        this.applicationState = container.get(ApplicationState);
    }

    run(instruction: NavigationInstruction, next: Next): Promise<any> {
        let state = this.applicationState;
        state.reset();
        let instructions = instruction.getAllInstructions();
        instructions.forEach(t => state.merge(t.params, t.queryParams));
        return next();
    }
}

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