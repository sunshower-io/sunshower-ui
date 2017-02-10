import {
    inject,
    bindable,
    containerless,
    customElement
} from 'aurelia-framework';
import {createEvent} from "common/lib/utils";

@containerless
@customElement('tree')
export class Tree {

    @bindable
    self: Tree;

    @bindable
    nodes: NodeLike[];

    selected: JQuery[];

    constructor(private element:Element) {
        this.self = this;
    }

    attached() : void {
    }

    focus(nodes:NodeLike[]) : void {
        if(this.selected && this.selected.length) {
            for(let s of this.selected) {
                s.removeClass('active');
            }
        }
        if(nodes && nodes.length) {
            this.selected = [];
            for(let node of nodes) {
                let child = $(`#${node.id}`);
                if(child) {
                    child.addClass('active');
                    this.selected.push(child);
                }
            }
        }
    }

    nodeClicked(node:NodeLike) : void {
        this.element.dispatchEvent(createEvent('node-clicked', node));
    }

}

export interface NodeLike {
    id          : string;
    children    : NodeLike[];
}