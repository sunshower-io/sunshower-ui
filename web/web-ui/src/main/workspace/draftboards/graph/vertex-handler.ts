import {
    Layer,
    mxVertexHandler
} from 'mxgraph';


export class VertexHandler extends mxVertexHandler {

    resizeCell(
        cell:Layer,
        dx:number,
        dy:number,
        index:number,
        gridEnabled:boolean,
        constrained:boolean,
        recurse:boolean
    ) {
        let fixed = cell.getAttribute('lfix');
        if(fixed) {
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


    private handleFixed(
        cell:Layer ,
        dx: number,
        dy: number,
        index: number,
        gridEnabled: boolean,
        constrained: boolean,
        recurse: boolean
    ) {


    }
}