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
    NavigatorManager, LinkObject
} from "./navigator-element";
import {VelocityAnimator} from 'aurelia-animator-velocity';
import {Observable} from "rxjs/Observable";
import "rxjs/add/observable/fromEvent";
import "rxjs/add/operator/debounceTime";


@autoinject
export class Navigator {

    public static readonly CONTEXT_CHANGED_EVENT = 'navigator:context:changed';

    private controlId               : string       =  UUID.random();

    private rootElement             : HTMLElement;
    private navigator               : HTMLElement;
    private navigatorControl        : HTMLElement;
    private searchField             : HTMLInputElement;

    @bindable
    private  searchResults          : LinkObject[];

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
        this.configureSearch();
        this.configureSideNav();
        this.configureCollapsibles();
    }



    openObject(o : LinkObject) : void {
        o.open().then(t => {
            this.context.load().then(u => {
                this.searchResults = null;
                this.searchField.value = "";
                this.groups = this.context.children;
            });
        });
    }

    private configureSideNav() {
        $(this.navigatorControl).sideNav();
        if(this.showing) {
            this.open();
        } else {
            this.close();
        }

    }


    private configureSearch() {
        Observable.fromEvent(this.searchField, 'keydown')
            .debounceTime(250)
            .forEach(t => {
                if(this.context && this.context.searchable) {
                    let v = this.searchField.value;
                    if(v) {
                        if(v.length > 2) {
                            this.context.search(v).then(l => {
                                if (l && l.length) {
                                    this.searchResults = l;
                                } else {
                                    this.searchResults = [this.context.createRef(v)];
                                }
                            });
                        }
                    } else {
                        this.searchResults = null;
                    }
                }
        });


    }

    private configureCollapsibles() {
        $(document).ready(function(){
            $('.collapsible').collapsible();
        });
    }
}