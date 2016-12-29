import {
    mxCellState,
    mxRectangle,
    mxCellRenderer
} from 'mxgraph';


export class CellRenderer extends mxCellRenderer {

    redrawControl(state: mxCellState, forced: boolean) {
        if(state.cell.getAttribute('collapsable')) {
            return super.redrawControl(state, forced);
        }
    }

    getControlBounds(state: mxCellState, w: number, h: number): mxRectangle {
        if(state.control) {
            var oldScale = state.control.scale;
            var w = state.control.bounds.width / oldScale;
            var h = state.control.bounds.height / oldScale;
            var s = state.view.scale;

            return new mxRectangle(
                state.x + state.width - w * s - 16,
                state.y + 16,
                // state.y + state.height + s - h / 2 * s,
                w * s,
                h * s
            );
        }
        return super.getControlBounds(state, w, h);
    }

}