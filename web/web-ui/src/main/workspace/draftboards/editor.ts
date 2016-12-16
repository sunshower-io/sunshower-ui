import {
    mxGraph
} from 'mxgraph';

import {MenuItem} from 'common/elements/menu';


export interface NavigationAware {
    toggleLeft() : boolean;
    toggleRight() : boolean;
}

export interface EditorContext {
    graph:mxGraph;
    offset: {top:number, left:number};
}

export interface EditorOperation {
    apply(context:EditorContext) : void;
}

export interface EditorEvent {
    operation:EditorOperation;
}



export interface Editor {
    menus: MenuItem[];
}