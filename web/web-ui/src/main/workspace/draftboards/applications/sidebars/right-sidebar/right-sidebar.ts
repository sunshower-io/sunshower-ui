
import {Sidebar} from "../sidebar";
import {bindable} from 'aurelia-framework';
import {Canvas} from 'canvas/core/canvas';


export class RightSidebar extends Sidebar {

    @bindable
    canvas: Canvas;


    constructor() {
        super();

        this.configure([{
            name: 'palette',
            icon: 'large grey file outline icon',
            active:true,
        },{
            name: 'properties',
            icon: 'large grey folder outline icon'
        }]);
        this.active = this.components[0];
    }


}