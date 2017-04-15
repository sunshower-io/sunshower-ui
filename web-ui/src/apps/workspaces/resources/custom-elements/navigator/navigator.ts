import 'materialize-css';
import 'mdi/css/materialdesignicons.css!'
import {UUID} from "common/lib/utils/uuid";
import {
    autoinject,
    bindable
} from 'aurelia-framework';
import {
    ElementGroup,
    NavigationContext,
    ContextChangedEvent,
    NavigatorManager
} from "./navigator-element";
import {EventAggregator} from "aurelia-event-aggregator";
import {VelocityAnimator} from 'aurelia-animator-velocity';


@autoinject
export class Navigator {

    public static readonly CONTEXT_CHANGED_EVENT = 'navigator:context:changed';

    private controlId               : string       =  UUID.random();

    private rootElement             : HTMLElement;
    private navigator               : HTMLElement;
    private navigatorControl        : HTMLElement;

    @bindable
    private context                 : NavigationContext;

    @bindable
    private groups                  : ElementGroup[]; //can we make this actually a collection of NavigationContexts?


    constructor(
        private navigatorManager: NavigatorManager,
        private velocityAnimator: VelocityAnimator
    ) {
        navigatorManager.subject.subscribe(t => {
            this.context = t.context;
        });
    }

    open() : void {

    }

    close() : void {

    }

    contextChanged(newVal: NavigationContext, old: NavigationContext) {
        newVal.load().then(t => {
            this.groups = newVal.children;
        }).then(t => {
            this.velocityAnimator.enter(this.rootElement);
        });
    }

    attached() : void {
        $(this.navigatorControl).sideNav();
        $(document).ready(function(){
            $('.collapsible').collapsible();
        });
    }

}