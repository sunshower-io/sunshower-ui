import {
    bindable,
    inject,
    customElement
} from 'aurelia-framework';
import {Registry} from "utils/registry";

@customElement('tree')
export class Tree {


    @bindable
    nodes: NodeLike[];


    attached() : void {
    }

}

export interface NodeLike {
    children:NodeLike[];
}