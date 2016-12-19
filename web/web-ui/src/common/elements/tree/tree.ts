import {
    bindable,
    customElement
} from 'aurelia-framework';

@customElement('tree')
export class Tree {

    @bindable
    nodes: NodeLike[];

}

export interface NodeLike {
    children:NodeLike[];
}