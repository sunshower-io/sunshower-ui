import {Element, AbstractElement} from "./elements";

export class Layer extends AbstractElement {

    icon                : string = 'assets/sui/themes/hasli/assets/images/layers.svg';

    constructor(
        public name:string,
        public description:string,
        public children:Element[]
    ) {
        super();
    }

}