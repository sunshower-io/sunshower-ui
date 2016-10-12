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

    private fire(e:Event):void {
        let target = <Element>e.target;
        Events.dispatch('chart-selected', this.element, {
            bubbles:true,
            cancelable:true,
            detail : {
                chartType: target.id,
                chartId: Hash.createId()
            }
        });
        
    }

}