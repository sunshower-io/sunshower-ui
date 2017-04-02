import {Container} from "aurelia-dependency-injection";
import {PipelineStep} from "aurelia-router";
import {NavigationInstruction} from "aurelia-router";
import {Next} from "aurelia-router";
import {ServiceManager} from "./service-manager";
export class ContextResolver implements PipelineStep {

    private readonly serviceManager: ServiceManager;

    constructor(private container: Container) {
        this.serviceManager = container.get(ServiceManager);
    }

    run(instruction: NavigationInstruction, next: Next): Promise<any> {
        let instructions = instruction.getAllInstructions(),
            manager = this.serviceManager;


        return instruction.getAllInstructions()
            .reduce((p:Promise<any>, instr:NavigationInstruction) => {
                return p.then(t => {
                    return Promise.all(manager.bindServices(instr.params, instr));
                });
            }, Promise.resolve()).then(t => next());
        // return Promise.resolve()
        //     .then(t => {
        //         let instr = instructions[0];
        //         return Promise.all(manager.bindServices(instr.params, instr));
        //     }).then(t => {
        //         let instr = instructions[1];
        //         return Promise.all(manager.bindServices(instr.params, instr));
        //     })
        //     .then(t => next());
        // return instruction.getAllInstructions().reduce(
        //     (c: Promise<any>, v: NavigationInstruction) => {
        //         let a = Promise.all(this.serviceManager.bindServices(v.params, v));
        //         return c.then(d => {
        //             console.log("Executing", d, c, a);
        //             return a;
        //         });
        //     }, Promise.resolve()).then(c => next());


        // .map(t => {
        //     this.serviceManager.bindServices(t.params, instruction)
        // });
        // return Promise.resolve(promises).each(t => next());
    }
}