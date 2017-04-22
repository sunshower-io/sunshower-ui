import {NavigationInstruction, Router} from "aurelia-router";
import {Navigator} from './navigator/navigator';
import {bindable, autoinject} from 'aurelia-framework';
import {BindingEngine, PropertyObserver} from "aurelia-binding";
import {ApplicationState} from "lib/common/storage/application-state";

export interface NavigationComponent {
    reference: string;
    active: boolean;
}


type Listener = (Router) => void;


@autoinject
export class NavigatorManager {

    @bindable
    public router                   : Router;

    @bindable
    public currentInstruction      : NavigationInstruction;

    public  open                    : boolean;
    private listeners               : Listener[];
    private observer                : PropertyObserver;


    constructor(
        private bindingEngine: BindingEngine,
        private applicationState: ApplicationState
    ) {
        this.listeners = [];
    }



    public bind(router: Router): void {
        this.observer = this.bindingEngine
            .propertyObserver(router, 'currentInstruction');
        let state = this.applicationState;
        this.observer.subscribe(instr => {
            this.currentInstruction = instr;
            state.merge(instr.params, instr.queryParams);
            this.open = state.queryParams().isTruthy('navigator');
        });
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