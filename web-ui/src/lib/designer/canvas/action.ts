import {Canvas} from "mxgraph";
export interface Action {

    name: string;
    run(canvas: Canvas) : void;
}