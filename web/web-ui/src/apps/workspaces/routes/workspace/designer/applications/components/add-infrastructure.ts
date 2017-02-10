
import {
    bindable,
    customElement
} from "aurelia-framework";

interface Component {
    name: string;
    icon: string;
    active?: boolean;
    ref:  string;
}
@customElement('add-infrastructure')
export class AddInfrastructure {

    @bindable
    private active:Component;

    @bindable
    components: Component[];


    private element:HTMLElement;


    constructor() {
        this.configure([{
            name: 'Infrastructure',
            ref: './infrastructure',
            icon: 'large grey file outline icon',
            active:true,
        },{
            name: 'Properties',
            ref: './properties',
            icon: 'large grey folder outline icon'
        }]);
        this.active = this.components[0];
    }


    show() : void {
        $(this.element).modal('show');
    }


    setActive(active:Component) {
        if(this.active) {
            this.active.active = false;
        }
        this.active = active;
        this.active.active = true;

    }

    attached() {
    }

    configure(components:Component[]) {
        this.components = [];
        for(let component in components) {
            this.components[component] = components[component];
        }
    }


}

