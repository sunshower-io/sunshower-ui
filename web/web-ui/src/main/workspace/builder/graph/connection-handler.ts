import {
    mxGraph,
    mxCell,
    mxEvent,
    mxStylesheet,
    mxConnectionHandler,
} from "mxgraph";
import {TaskManager} from "task/tasks";

import {Builder} from './builder';

export class ConnectionHandler extends mxConnectionHandler {


    constructor(
                public graph: Builder,
                connection?: (source: mxCell,
                              target: mxCell,
                              style: mxStylesheet
                ) => void) {
        super(graph, connection);
    }

    connect(
        source:mxCell,
        target:mxCell,
        event:mxEvent,
        dropTarget:mxCell
    ) {
        if(source && target) {
            return this.graph.taskManager.connect(source.id, target.id);
        }
        return false;
    }
}