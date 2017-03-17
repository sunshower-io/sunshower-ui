
declare interface DatamapConfiguration {
    scope                   ?:  string;
    projection              ?:  string;
    element                 :   HTMLElement;
    fills                   ?:  {[key:string]:any};
    geographyConfig         ?:  {[key:string]:any};
    bubblesConfig           ?:  {[key:string]:any};

    setProjection           ?: (element:any) => {
        path:any,
        projection:any
    };

    done                    ?: (map:Datamap) => void;

    zoomConfig              ?: {
        zoomOnClick: boolean,
        zoomFactor: number
    };

}


declare class Datamap {

    map: any;
    svg: any;

    bubbles(bubbles:any);
    addPlugin(name:string, plugin:any);
    latLngToXY(x:any, y:any) : any;
    labelDatacenters(l:any, cfg:any);

    constructor(config: DatamapConfiguration);



}

declare module Datamap {

}


declare module 'datamaps' {
    export = Datamap;
    //
    // export class Datamap {
    //     constructor(config:DatamapConfiguration);
    // }


}