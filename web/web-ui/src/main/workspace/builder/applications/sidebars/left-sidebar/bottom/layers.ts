import {inject} from 'aurelia-framework';
import {Element} from 'elements/elements';
import {Listener, ObservedEvent} from 'utils/observer';
import {ElementManager} from 'elements/element-manager'

@inject(ElementManager)
export class Layers {

    layers : Element[];
    constructor(
        public elementManager:ElementManager,
    ) {
        this.layers = elementManager.elements;
        // this.elementManager.addEventListener('element-modified', this);
    }

    // apply(event: ObservedEvent): void {
    //     this.layers = this.elementManager.elements;
    //     for(let layer of this.layers) {
    //         console.log("LAYER", layer);
    //         console.log("CHILDREN", layer.children);
    //     }
    // }

}