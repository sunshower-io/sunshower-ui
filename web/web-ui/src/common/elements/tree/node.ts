import {bindable} from 'aurelia-framework';
import {NodeLike} from "./tree";
export class Node {

    @bindable
    node: NodeLike;

    @bindable
    private rootUrl:string = '/hasli/api/v1/storage/s3/images';

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