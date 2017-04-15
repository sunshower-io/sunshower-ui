import {Container} from "aurelia-dependency-injection";
import {PipelineStep} from "aurelia-router";
import {NavigationInstruction} from "aurelia-router";
import {Next} from "aurelia-router";
import {ServiceManager} from "./service-manager";
import {
    NavigatorManager,
    ContextChangedEvent
} from "apps/workspaces/resources/custom-elements/navigator/navigator-element";
export class ContextResolver implements PipelineStep {

    private readonly serviceManager                 : ServiceManager;
    private readonly navigationManager              : NavigatorManager;

    constructor(
        private container: Container,
    ) {
        this.serviceManager = container.get(ServiceManager);
        this.navigationManager = container.get(NavigatorManager);
    }

    run(instruction: NavigationInstruction, next: Next): Promise<any> {
        let instructions = instruction.getAllInstructions(),
            manager = this.serviceManager;

        let navigating = instruction.params.navigation;


        return instructions.reduce((p: Promise<any>, instr: NavigationInstruction) => {
            return p.then(t => {
                return Promise.all(manager.bindServices(instr.params, instr)).then(u => {
                    let context = instr.router.options.navigationContext;
                    if(context) {
                        this.navigationManager.change(new ContextChangedEvent(context, navigating));
                    }
                });
            });
        }, Promise.resolve()).then(t => next());
    }
}