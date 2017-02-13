
import {bindable} from "aurelia-framework";
interface Component {
    location            : string;
    name                : string;
    icon                : string;
    active              ?: boolean;
}

export class Sidebar {
    @bindable
    protected activeTop:Component;

    @bindable
    protected activeBottom: Component;

    @bindable
    public componentsTop: Component[];

    @bindable
    public componentsBottom: Component[];


    setActiveTop(active:Component) {
        if(this.activeTop) {
            this.activeTop.active = false;
        }
        this.activeTop = active;
        this.activeTop.active = true;
    }

    setActiveBottom(active:Component) {
        if(this.activeBottom) {
            this.activeBottom.active = false;
        }
        this.activeBottom = active;
        this.activeBottom.active = true;
    }

    attached() {
    }

    configure(components:Component[]) {
        this.componentsTop    = [];
        this.componentsBottom = [];
        for(let component of components) {
            if(component.location === 'top') {
                this.componentsTop.push(component);
            } else {
                this.componentsBottom.push(component);
            }
        }
    }


}