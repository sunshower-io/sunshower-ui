
declare interface DatamapConfiguration {
    scope                   ?:  string;
    projection              ?:  string;
    element                 :   HTMLElement;
    fills                   ?:  {[key:string]:any}
    geographyConfig         ?:  {[key:string]:any}
}

declare class Datamap {

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