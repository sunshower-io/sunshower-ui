import * as _ from 'lodash';
import {Service} from "lib/common/service";
import {NavigationInstruction} from "aurelia-router";


export class ServiceManager {

    private readonly serviceBindings:Map<string, Service<any>>;

    constructor() {
        this.serviceBindings = new Map<string, Service<any>>();
    }

    bindServices(params: any, instruction: NavigationInstruction) : Promise<any>[] {
        let a = _.flatMap(_.keys(params), (t => {
            let resolution = this.serviceBindings.get(t);
            if(resolution) {
                return [resolution.bind(params[t])];
            } else {
                return [];
            }
        }));
        return a;
    }


    register(key:string, service:Service<any>) : void {
        this.serviceBindings.set(key, service);
    }
}
