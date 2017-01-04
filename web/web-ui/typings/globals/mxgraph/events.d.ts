declare module 'mxgraph' {

    export class mxEvent {
        static readonly CHANGE                  : string;
        static readonly CLICK                   : string;
        static readonly GROUP_CELLS             : string;


        consume() : void;
        static getSource(e:Event) : HTMLElement;

        getProperty(key:string) : any;

    }

    export class mxEventObject extends mxEvent {

        /**
         *
         * @param type
         * @param g
         * @param group
         * @param b
         * @param border
         * @param c
         * @param cells
         */
        constructor(
            type:string,
            g:string,
            group:Layer,
            b: string,
            border: number,
            c: string,
            cells:Layer[]
        );
    }

}