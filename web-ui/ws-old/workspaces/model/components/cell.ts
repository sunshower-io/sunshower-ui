import {EditorContext} from "common/lib/canvas";

export interface Constrained {
    satisfy(context:EditorContext) : void;
}

