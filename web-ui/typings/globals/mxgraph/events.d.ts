declare module 'mxgraph' {

    export class mxEvent {

        static readonly CELLS_ADDED             : string;
        static readonly CELLS_REMOVED           : string;
        static readonly UNDO                    : string;
        static readonly ADD                     : string;
        static readonly CLEAR                   : string;
        static readonly REDO                    : string;
        static readonly CHANGE                  : string;
        static readonly CLICK                   : string;
        static readonly GROUP_CELLS             : string;
        static readonly DOUBLE_CLICK            : string;


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