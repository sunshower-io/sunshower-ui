import {CompositeElement} from './layer';

export class GroupElement extends CompositeElement {

    constructor(name: string,
                description: string) {
        super(
            name,
            description,
            `assets/sui/themes/hasli/assets/images/layers.svg`
        );
    }


}