
import {UUID} from 'utils/uuid';


export interface Element {
    id:UUID;

    children: Element[];

    add(child:Element) : Element;
}



export class AbstractElement implements Element {

    public id           : UUID;
    public name         : string;
    public children     : Element[];


    constructor() {
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
        public icon:string,
        public name:string,
        public applicationId: string
    ) {
        super();
    }
}

export class InfrastructureElement extends AbstractElement {

}