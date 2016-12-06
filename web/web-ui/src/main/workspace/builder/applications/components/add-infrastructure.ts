
import {
    inject,
    bindable,
    customElement
} from "aurelia-framework";
import {Task} from "task/tasks";

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

    @bindable
    task: Task;


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

    hide() : void {
        this.task.dispatch('on-change', {
            target:this.task
        });
        this.task = null;
        $(this.element).modal('hide');
    }

    saveConfiguration() : void {
        if(this.task) {
            this.task.dispatch('on-change', {
                target:this.task
            });
            this.task = null;
        }
        $(this.element).modal('hide');
    }

    cancel() : void {
        $(this.element).modal('hide');
        this.task = null;
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

