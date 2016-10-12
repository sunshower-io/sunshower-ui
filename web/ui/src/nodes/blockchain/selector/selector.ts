import {
    customElement
} from 'aurelia-framework';
import {autoinject} from "aurelia-dependency-injection";

import {Events} from '../../../utils/Events';
import {Hash} from "../../../utils/Hash";


@autoinject()
@customElement('chart-selector')
export class Selector {


    constructor(private element:Element) {}

    public attached():void {
        $(this.element).find('div.col-md-1').click(e => this.fire(e));
    }
    
    showTimeline() {
        this.fire('show-timeline');
    }
    
    showList() {
        this.fire('show-list');
    }

    private fire(name:string):void {
        Events.dispatch(name, this.element, {
            bubbles:true,
            cancelable:true,
            detail : { }
        });
        
    }

}