import {Sidebar} from "../sidebar";
import {bindable} from 'aurelia-framework';
import {Canvas} from 'canvas/core/canvas';


export class RightSidebar extends Sidebar {

    @bindable
    canvas: Canvas;


    constructor() {
        super();
        this.configure([{
            location: 'top',
            name: 'palette',
            icon: 'large grey file outline icon',
            active: true,
        }, {
            location: 'top',
            name: 'properties',
            icon: 'large grey folder outline icon'
        }, {
            location: 'bottom',
            name: 'applications',
            icon: 'large block layout icon',
        }, {
            location: 'bottom',
            name: 'blocks',
            icon: 'large cubes layout icon',
        }, {
            location: 'top',
            name: 'editor',
            icon: 'large write icon'
        }
        ]);
        this.activeTop = this.componentsTop[0];
        this.activeBottom = this.componentsBottom[0];
    }


}