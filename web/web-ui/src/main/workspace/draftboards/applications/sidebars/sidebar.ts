
import {bindable} from "aurelia-framework";
interface Component {
    name: string;
    icon: string;
    active?: boolean;
}

export class Sidebar {
    @bindable
    protected active:Component;

    @bindable
    public components: Component[];


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