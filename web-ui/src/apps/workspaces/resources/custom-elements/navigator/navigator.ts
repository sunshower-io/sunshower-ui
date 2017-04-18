import {UUID} from 'lib/common/lang';
import {bindable} from "aurelia-templating";
export class Navigator {


    @bindable
    private controlId: string;

    constructor() {
        this.controlId = UUID.randomUUID().value;
    }
}