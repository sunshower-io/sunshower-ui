import {inject} from 'aurelia-framework';
import {ElementManager} from 'elements/element-manager'

@inject(ElementManager)
export class Layers {

    constructor(
        public elementManager:ElementManager,
    ) {

    }


}