declare module 'mxgraph' {
    export class mxGraphHandler {

        graph                       : mxGraph;
        gridEnabled                 : boolean;
        guidesEnabled               : boolean;

        constructor(graph:mxGraph);

        /**
         *
         * @param remove
         */
        setRemoveCellsFromParent(remove:boolean);

        /**
         *
         * @param self
         */
        getInitialCellForEvent(self:mxGraphHandler);


        getCells(cells:Layer) : Layer[];

        /**
         * @param cells
         * @param dx
         * @param dy
         * @param clone
         * @param target
         * @param event
         */
        moveCells(
            cells:Layer[],
            dx:number,
            dy:number,
            clone:boolean,
            target:mxCell,
            event:mxEvent
        );
    }


    export class mxVertexHandler {

        graph:mxGraph;

        constrainGroupByChildren: boolean;


        constructor(state:mxCellState);

        /**
         *
         * @param cell
         * @param dx
         * @param dy
         * @param index
         * @param gridEnabled
         * @param constrained
         * @param recurse
         */
        resizeCell(cell: Layer,
                   dx: number,
                   dy: number,
                   index: number,
                   gridEnabled: boolean,
                   constrained: boolean,
                   recurse: boolean)

        /**
         *
         * @param cell
         * @param dx
         * @param dy
         */
        moveChildren(cell:Layer, dx:number, dy:number);
    }
}