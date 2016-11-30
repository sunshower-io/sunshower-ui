declare module 'mxgraph' {

    export class mxEvent {
        static readonly CLICK:string;



        static getSource(e:Event) : HTMLElement;

        consume() : void;
        getProperty(key:string) : any;

    }

}