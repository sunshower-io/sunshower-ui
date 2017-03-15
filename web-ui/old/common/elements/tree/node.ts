import {bindable} from 'aurelia-framework';
import {NodeLike, Tree} from "./tree";
import {createEvent} from "utils/events";
export class Node {

    @bindable
    node: NodeLike;

    @bindable
    private rootUrl:string = '/hasli/api/v1/storage/s3/images';


    @bindable
    private tree:Tree;

    toggle(e:Event) : void {
        let container = $(e.target).parent().parent(),
            sublist = container.find('ul'),
            caret = container.find('i.caret');
        sublist.toggle();
        caret.toggleClass((index:number, name:string, state:boolean) => {
            return state ? 'down' : 'right';
        });
    }

    onClick(node: NodeLike) {
        this.tree.nodeClicked(node);
    }
}