
import {UUID} from 'utils/uuid';
import {VirtualCloud} from "./cloud";


export interface Element {
    id:UUID;
    parent                  ?: Element;
    children                : Element[];
    add(child:Element)      : Element;
}



export class AbstractElement implements Element {

    public id           : UUID;
    public name         : string;
    public children     : Element[];

    constructor(public parent?: Element) {
        this.id = UUID.randomUUID();
    }


    add(element:Element) :Element {
        if(!this.children) {
            this.children = [];
        }
        this.children.push(element);
        return element;
    }


}



export class ApplicationElement
    extends AbstractElement
    implements Element {

    constructor(
        cloud   : InfrastructureElement,
        public icon:string,
        public name:string,
        public applicationId: string
    ) {
        super(cloud);
    }
}

export class InfrastructureElement extends AbstractElement {
    icon: string = 'assets/sui/themes/hasli/assets/images/icons/provider/generic/single-node-instance.svg';

    constructor(cloud:VirtualCloud) {
        super(cloud);
    }
}