import {
    Layer,
    mxCellState,
    mxEvent,
    mxVertexHandler
} from 'mxgraph';
import {LayeredNode} from "../cells/layer";
import {GraphHandler} from "./graph-handler";


export class VertexHandler extends mxVertexHandler {


    constructor(state: any) {
        super(state);
    }


    getCells(initial: Layer): Layer[] {
        return super.getCells(initial);
    }

    // moveCells(cells: Layer[],
    //           dx: number,
    //           dy: number,
    //           clone: boolean,
    //           target: Layer,
    //           event: mxEvent) {
    //     console.log("MOVE");
    //     super.moveCells(cells, dx, dy, clone, target, event);
    // }

    resizeCell(cell: Layer,
               dx: number,
               dy: number,
               index: number,
               gridEnabled: boolean,
               constrained: boolean,
               recurse: boolean) {
        console.log("RESIZE");
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
        console.log("MOVE CHILDREN");
        let model = this.graph.getModel();
        if (cell.getAttribute('synthetic')) {
            let layer = (cell as any) as LayeredNode<any>,
                children = layer.members;
            for (let child of children) {
                let geometry = this.graph.getCellGeometry(child);
                if (geometry) {
                    geometry = geometry.clone();
                    geometry.translate(dx, dy);
                    model.setGeometry(child, geometry);
                }
            }
        } else {
            super.moveChildren(cell, dx, dy);
        }
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