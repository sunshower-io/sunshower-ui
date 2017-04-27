import {Canvas} from "mxgraph";
export interface Action {
    run(canvas: Canvas) : void;
}