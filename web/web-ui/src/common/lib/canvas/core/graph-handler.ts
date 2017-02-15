import {
    mxGraphHandler,
    mxCell,
    mxEvent,
    mxGraph
} from 'mxgraph';

export class GraphHandler extends mxGraphHandler {

    constructor(graph: mxGraph) {
        super(graph);
        this.guidesEnabled = true;
        this.gridEnabled = true;

    }

    // getCells(initialCell: mxCell): mxCell[] {
    //     //
    //     // if (initialCell && initialCell.getAttribute('synthetic')) {
    //     //     let layered = (initialCell as any) as LayeredNode<any>;
    //     //     let result = [initialCell].concat(layered.members);
    //     //     console.log("RESULT", result);
    //     //     return result;
    //     // }
    //     // return super.getCells(initialCell);
    // }

    // moveCells(cells: mxCell[],
    //           dx: number,
    //           dy: number,
    //           clone: boolean,
    //           target: mxCell,
    //           event: mxEvent): void {
    //     // let c = [].concat(cells);
    //     // for(let cell of cells) {
    //     //     if(cell.getAttribute('synthetic')) {
    //     //         let layered = (cell as any) as LayeredNode<any>;
    //     //         c = c.concat(layered.members);
    //     //     }
    //     // }
    //     let results = super.moveCells(cells, dx, dy, clone, target, event);
    //     console.log("Cells", cells);
    //     return results;
    // }


}