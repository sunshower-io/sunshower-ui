import * as $ from 'jquery';
import {
    customElement,
    inject,
    bindable
} from "aurelia-framework";
import {NodeService, Node, Nodes} from "../../service/nodes/NodeService";
import {Router} from "aurelia-router";
import {Details} from "../../nodes/details/details";


export class Options {

    constructor(
        public x:number = null,
        public y:number = null,
        public offsetx: number = null,
        public offsety: number = null,
        public data:Node = null,
        public showing:boolean = false, 
        public scale:number = 0
    ) {
    }
    
    
    getOs() : string {
        return this.data.classes == 'linux' ? 
            'ion-social-tux' :
            'ion-social-windows-outline';
    }
    
    getPosition() : [string, string, number] {
        let scale = this.scale,
            x = (this.x + this.offsetx) / scale - 19,
            y = ((this.y + this.offsety) / scale) - 19;
        return [x + 'px', y+ 'px', scale ];
    }

}


@inject(Element, Router)
@customElement('node-info')
export class NodeInfo {


    
    @bindable options:Options;
    
    @bindable osTypeStyle:string;
    
    
    constructor(
        private element:Element, 
        private router:Router
    ) { }

    openNode() : void {
        this.router.navigate(`#/node/${this.options.data.id}/details`);
    }

    optionsChanged() {
        if (this.options.showing && this.options != null) {
            let [x, y, z] = this.options.getPosition();
            $(this.element).css({
                display:'flex',
                top: y,
                left: x,
                zoom:z,
                position: 'fixed',
                color: 'white'
            });
            this.osTypeStyle = this.options.getOs();
        } else {
            $(this.element).hide();
        }
    }

    attached():void {
        $(this.element).hide();
    }
}
