import {
    Layer,
    mxVertexHandler
} from 'mxgraph';


export class VertexHandler extends mxVertexHandler {


    constructor(state: any) {
        super(state);
    }


    getCells(initial: Layer): Layer[] {
        return super.getCells(initial);
    }

    resizeCell(cell: Layer,
               dx: number,
               dy: number,
               index: number,
               gridEnabled: boolean,
               constrained: boolean,
               recurse: boolean) {
        let fixed = cell.getAttribute('lfix');
        if (fixed) {
            this.handleFixed(
                cell,
                dx,
                dy,
                index,
                gridEnabled,
                constrained,
                recurse
            );
        } else {
            super.resizeCell(
                cell, dx,
                dy, index,
                gridEnabled, constrained,
                recurse
            )
        }

    }

    moveChildren(cell: Layer, dx: number, dy: number) {
        super.moveChildren(cell, dx, dy);
    }


    private handleFixed(cell: Layer,
                        dx: number,
                        dy: number,
                        index: number,
                        gridEnabled: boolean,
                        constrained: boolean,
                        recurse: boolean) {
    }


}