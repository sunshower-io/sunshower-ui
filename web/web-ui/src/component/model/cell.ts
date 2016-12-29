import {Layer} from 'mxgraph';
import {EditorContext} from "canvas/core/canvas";

export interface Constrained {
    satisfy(context:EditorContext) : void;
}