import * as _ from 'lodash';
import {Router} from "aurelia-router";
import {bindable} from 'aurelia-framework';

export interface NavigationElement {
    href            : string;
    title           : string;
    settings        : any;
}

export interface ElementGroup {
    key             : string;
    name            : string;
    icon            ?: string;
    color           ?: string;
    create          ?: string;

    elements        : NavigationElement[]

}

export interface NavigationContext {

    create                                  ?: boolean;
    color                                   ?: string;
    icon                                    ?: string;
    loading                                 : boolean;
    children                                : ElementGroup[];
    load()                                  : Promise<boolean>;
    hasChildren()                           : boolean;

    navigate(e : NavigationElement)         : void;


    navigationElements(defaultGroup:string) : ElementGroup[];


}

export abstract class RouterNavigationContext implements NavigationContext {

    @bindable
    public  loading             : boolean;
    public  router              : Router;

    @bindable
    public  children            : ElementGroup[];
    constructor() {

    }

    abstract hasChildren()                           : boolean;
    abstract load()                                  : Promise<boolean>;
    abstract navigate(e : NavigationElement)         : void;

    protected partition(navigationElements: NavigationElement[], group:string) : ElementGroup[] {

        let result = navigationElements.reduce((acc, val) => {
            let k : string;
            if(val.settings && val.settings.groupKey) {
                k = val.settings.groupKey;
            } else {
                k = group;
            }
            let gkey = k,
                current = acc[gkey];
            if(!current) {
                current = {
                    name            : gkey,
                    key             : gkey,
                    elements        : [val]
                };
                acc[gkey] = current;
            } else {
                current.elements.push(val);
            }
            return acc;
        }, {});
        return _.values(result) as ElementGroup[];
    }

    navigationElements(defaultGroup:string): ElementGroup[] {
        return this.partition(this.router.navigation, 'Workspaces');
    }

}


