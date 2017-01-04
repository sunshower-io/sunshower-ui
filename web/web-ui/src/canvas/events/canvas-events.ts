import {Layer} from "mxgraph";

export class CanvasEvents {
    static readonly CELL_SELECTION_CHANGED          : string = 'cells-selection-changed';
}

export interface CanvasEvent {


    type        : string;
    cells       : Layer[];
}

export interface CellChangedEvent extends CanvasEvent {

}

