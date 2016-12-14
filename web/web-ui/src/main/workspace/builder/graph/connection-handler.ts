import {
    mxGraph,
    mxCell,
    mxEvent,
    mxStylesheet,
    mxConnectionHandler,
} from "mxgraph";

import {Builder} from './builder';

export class ConnectionHandler extends mxConnectionHandler {


    constructor(public graph: Builder,
                connection?: (source: mxCell,
                              target: mxCell,
                              style: mxStylesheet) => void) {
        super(graph, connection);
    }

    connect(source: mxCell,
            target: mxCell,
            event: mxEvent,
            dropTarget: mxCell) {
        // if(source && target) {
        //     let result = this.graph.taskManager.connect(
        //         (<any>source).data.id.value,
        //         (<any>target).data.id.value);
        //     if(result) {
        return super.connect(source, target, event, dropTarget);
        //     }
        // }
        // return false;
    }
}