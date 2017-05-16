import {bindable, autoinject} from 'aurelia-framework';
import {NavigationInstruction, RouteConfig, Router} from "aurelia-router";
import {BindingEngine, PropertyObserver} from "aurelia-binding";
import {ApplicationState} from "lib/common/storage/application-state";

export interface NavigationComponent {
    reference: string;
    active: boolean;
}


type Listener = (Router) => void;


@autoinject
export class NavigatorManager {

    static instance                 : NavigatorManager;

    @bindable
    public router                   : Router;

    @bindable
    public currentInstruction       : NavigationInstruction;

    public open                     : boolean;
    private listeners               : Listener[];
    private observer                : PropertyObserver;


    constructor(private bindingEngine: BindingEngine,
                private applicationState: ApplicationState,
    ) {
        this.listeners = [];
        NavigatorManager.instance = this;
    }


    public unbind(router: Router): void {

    }


    public static getInstance(): NavigatorManager {
        return NavigatorManager.instance;
    }

    public static bind(router: Router) {
        NavigatorManager.getInstance().bind(router);
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


    public onBind(f: (Router) => void) {
        this.listeners.push(f);
    }
}

export type ActivateFunction = (p: any, r: RouteConfig, n: NavigationInstruction) => void;

function onActivation(activate: ActivateFunction, self: any): ActivateFunction {
    return (p: any, r: RouteConfig, n: NavigationInstruction) => {
        if(n) {
            NavigatorManager.bind(n.router);
        }
        if(activate) {
            activate.apply(self, [p, r, n]);
        }
    }
}

export function NavigationAware(target: any): void {

    let self = target as any,
        activate = self.activate;

    self.prototype.activate = onActivation(activate, self);
}