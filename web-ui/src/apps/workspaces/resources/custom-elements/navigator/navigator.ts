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

    @bindable
    private showing                 : boolean;

    constructor(
        private navigatorManager: NavigatorManager,
        private velocityAnimator: VelocityAnimator
    ) {
        navigatorManager.subject.subscribe(t => {
            this.showing = t.open;
            this.context = t.context;
        });
    }

    open() : void {
        $(this.navigatorControl).sideNav('show');
    }

    close() : void {
        $(this.navigatorControl).sideNav('hide');
    }


    contextChanged(newVal: NavigationContext, old: NavigationContext) {
        newVal.load().then(t => {
            this.groups = newVal.children;
        }).then(t => {
            this.velocityAnimator.enter(this.rootElement);
        });
    }



    attached(p:any) : void {
        $(this.navigatorControl).sideNav();
        if(this.showing) {
            this.open();
        } else {
            this.close();
        }
        $(document).ready(function(){
            $('.collapsible').collapsible();
        });
    }

}