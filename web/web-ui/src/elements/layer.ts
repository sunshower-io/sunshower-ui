import {Element, AbstractElement} from "./elements";

export class Layer extends AbstractElement {


    constructor(
        public name:string,
        public description:string,
        public children:Element[]
    ) {
        super();
    }

}