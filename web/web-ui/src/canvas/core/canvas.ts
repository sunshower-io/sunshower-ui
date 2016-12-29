import {
    mxGraph
} from 'mxgraph';

import {MenuItem, OperationContext} from 'common/elements/menu';


export interface NavigationAware {
    toggleLeft(): boolean;
    toggleRight(): boolean;
}

export interface EditorContext {
    host        : NavigationAware;
    graph       : mxGraph;
    offset      ?: {top: number, left: number};
    location    ?: {x: number, y: number};
}

export interface EditorOperation extends OperationContext {
    apply(context: EditorContext): void;
}

export interface EditorEvent {
    operation: EditorOperation;
}


export interface Editor {
    menus: MenuItem[];
}
