

declare module Plotly {

    function plot(
        element:Element | string,
        data: Trace[],
        layout:Layout,
        options?: {[key:string]:any}
    ) : void;

    function newPlot(
        element:Element | string,
        data: Trace[],
        layout:Layout,
        options?: {[key:string]:any}
    ) : void;

    function redraw(
        element: Element | string
    ): void;
}

declare class Plotly {

}

declare class Line {
    shape           ?: string;
    color           ?: string;
}

declare class Trace {

    x               : number[];
    y               : number[];
    mode            : string;
    name            : string;

    line            : Line;

}

declare class Layout {
    title                   ?: string;
    plot_bgcolor            ?: string;
    paper_bgcolor           ?: string;
    margin                  ?: Margin;

    legend                  ?: Legend;

    showlegend              ?: boolean;

}


declare interface Plot {

}

declare interface Font {

}

declare interface Legend {
    x           ?: number;
    y           ?: number;
    traceorder  ?: string;
    font        ?: Font,
    bgcolor     ?: string;
    bordercolor ?: string;
    borderwidth ?: number;
}

declare interface Margin {
    l           ?:number;
    r           ?:number;
    b           ?:number;
    t           ?:number;
    pad         ?:number;
}
declare module 'plotly/plotly.js' {

    export = Plotly;

}
