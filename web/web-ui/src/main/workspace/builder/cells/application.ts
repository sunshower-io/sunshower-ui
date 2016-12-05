

import {mxCell, mxGraph} from "mxgraph";
import {Task} from "task/tasks";


export class ApplicationCell extends mxCell {

    constructor(graph:mxGraph, public task:Task) {
        super();
    }





}