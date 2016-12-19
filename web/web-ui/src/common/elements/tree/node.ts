import {bindable} from 'aurelia-framework';
import {NodeLike} from "./tree";
export class Node {

    @bindable
    node: NodeLike;

    toggle(e:Event) : void {
        let container = $(e.target).parent().parent(),
            sublist = container.find('ul'),
            caret = container.find('i.caret');
        sublist.toggle();
        caret.toggleClass((index:number, name:string, state:boolean) => {
            return state ? 'down' : 'right';
        });
    }
}