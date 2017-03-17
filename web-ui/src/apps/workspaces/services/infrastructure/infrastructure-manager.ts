import {Element} from 'common/lib/canvas/element';
import {
    GatewayElement,
    EndpointElement,
    LoadBalancerComponentElement
} from "apps/workspaces/model/infrastructure";

export class InfrastructureManager {

    public elements: {[key:string] : Element};
    private elementList:Element[];

    constructor() {
        this.elements = {};
        this.elementList = [];
        this.register(new GatewayElement());
        this.register(new EndpointElement());
        this.register(new LoadBalancerComponentElement());
    }

    get(id: string) :  Element {
        return this.elements[id];
    }

    register(e:Element) {
        this.elements[e.id] = e;
        this.elementList.push(e);
    }

    list() : Element[] {
        return this.elementList;
    }
}