import {Layer} from "mxgraph";

export class CanvasEvents {
    static readonly DASHBOARD_OPENED                : string = 'dashboard-opened';
    static readonly CELL_SELECTION_CHANGED          : string = 'cells-selection-changed';

}

export interface CanvasEvent {


    type        : string;
    sender      : any;
    cells       : Layer[];
}

export interface CellChangedEvent extends CanvasEvent {

}

