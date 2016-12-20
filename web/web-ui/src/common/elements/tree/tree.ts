import {
    bindable,
    containerless,
    customElement
} from 'aurelia-framework';

@containerless
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