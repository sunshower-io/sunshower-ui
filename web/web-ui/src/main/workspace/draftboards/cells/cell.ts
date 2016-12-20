import {Layer} from 'mxgraph';
import {EditorContext} from "../editor";


export interface Constrained {
    satisfy(context:EditorContext) : void;
}