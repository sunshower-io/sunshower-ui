import {Sidebar} from "../sidebar";
import {bindable} from 'aurelia-framework';
import {Canvas} from 'common/lib/canvas';


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
        }, {
            location: 'bottom',
            name: 'components',
            icon: 'cloud icon'

        }]);
        this.activeTop = this.componentsTop[0];
        this.activeBottom = this.componentsBottom[0];
        this.componentsBottom[0].active = true;
    }

    attached() : void {

    }


}