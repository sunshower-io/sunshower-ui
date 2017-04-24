import {Router} from "aurelia-router";
import {bindable} from 'aurelia-framework';

export interface NavigationComponent {
    reference: string;
    active: boolean;
}


type Listener = (Router) => void;


export class NavigatorManager {

    @bindable
    public router: Router;

    private listeners: Listener[];

    constructor() {
        this.listeners = [];
    }


    public bind(router: Router): void {
        this.router = router;
        this.listeners.forEach(t => t(router));
    }

    public getCurrent(): NavigationComponent {
        return this.router
            .currentInstruction
            .config
            .navModel
            .settings
            .contextComponent;
    }


    public onBind(f : (Router) => void) {
        this.listeners.push(f);
    }
}