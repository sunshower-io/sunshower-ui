import * as _ from 'lodash';
import {Router} from "aurelia-router";
import {bindable} from 'aurelia-framework';
import {Subject} from "rxjs/Subject";


export interface LinkObject {
    name            : string;
    open()          : Promise<any>;
}

export interface NavigationElement {
    id              ?: string;
    href: string;
    title: string;
    settings: any;
}

export interface ElementGroup {
    key: string;
    name: string;
    icon            ?: string;
    color           ?: string;
    create          ?: string;

    elements: NavigationElement[]

}


export class ContextChangedEvent {
    constructor(
        public readonly context: NavigationContext,
        public readonly open:boolean = true
    ) {

    };
}

export class NavigatorManager {

    public readonly subject: Subject<ContextChangedEvent>;

    constructor() {
        this.subject = new Subject();
    }

    public change(e: ContextChangedEvent) {
        this.subject.next(e);
    }

}


export interface NavigationContext {

    searchable                              : boolean;

    create                                  ?: boolean;
    color                                   ?: string;
    icon                                    ?: string;
    loading: boolean;
    children: ElementGroup[];

    parent                                  ?: NavigationContext;


    createRef(name:string)                  : LinkObject;

    load()                                  : Promise<boolean>;
    hasChildren()                           : boolean;

    navigate(e: NavigationElement)          : void;


    navigationElements(defaultGroup: string): ElementGroup[];


    open()                                  : Promise<any>;
    search(input:string)                    : Promise<LinkObject[]>;
}

export abstract class RouterNavigationContext implements NavigationContext {

    @bindable
    public loading              : boolean;
    public router               : Router;

    public parent               ?: NavigationContext;

    public searchable           : boolean;
    @bindable
    public children: ElementGroup[];

    constructor() {

    }



    public chain() : NavigationContext[] {
        let current = this as NavigationContext,
            ch = [];
        while(current) {
            ch.push(current);
            current = current.parent as NavigationContext;
        }
        return ch.reverse();
    }

    public abstract createRef(input:string)          : LinkObject;

    abstract open()                                  : Promise<any>;

    abstract hasChildren()                           : boolean;

    abstract load()                                  : Promise<boolean>;

    abstract navigate(e: NavigationElement)          : void;
    abstract search(input:string)                    : Promise<LinkObject[]>;

    protected partition(
        navigationElements: NavigationElement[],
        group: string
    ): ElementGroup[] {

        let result = navigationElements.reduce((acc, val) => {
            let k: string;
            if (val.settings && val.settings.groupKey) {
                k = val.settings.groupKey;
            } else {
                k = group;
            }
            let gkey = k,
                current = acc[gkey];
            if (!current) {
                current = {
                    name: gkey,
                    key: gkey,
                    elements: [val]
                };
                acc[gkey] = current;
            } else {
                current.elements.push(val);
            }
            return acc;
        }, {});
        return _.values(result) as ElementGroup[];
    }

    navigationElements(defaultGroup: string): ElementGroup[] {
        return this.partition(this.router.navigation, 'Workspaces');
    }

}


