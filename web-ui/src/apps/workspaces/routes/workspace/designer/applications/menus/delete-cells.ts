import {Layer} from 'mxgraph';
import {Element} from 'common/lib/canvas/element';
import {AbstractMenuItem} from 'common/lib/widget';
import {EditorContext} from "apps/workspaces/routes/workspace/designer/editor";

export default class DeleteCells extends AbstractMenuItem {

    name: string = 'Delete cells';

    private collect(cell:Layer, cells: Layer[]) {
        cells.push(cell);
        if(cell.children) {
            for(let child of cell.children) {
                this.collect(child, cells);
            }
        }
        if((cell as any).childNodes) {
            let celement = cell as Element;
            for(let c of celement.getSuccessors()) {
                this.collect(c, cells);
            }
        }
        // canvas.removeCells([cell], true);
    }

    apply(editor:EditorContext) : void {
        let canvas = editor.graph,
            model = canvas.model;
        try {
            model.beginUpdate();
            model.clear();

            // let results = [];
            // for(let cell of canvas.getSelectionCells()) {
            //     this.collect(cell, results);
            // }
            // canvas.removeCells(results);
            // for(let result of results) {
            //     model.remove(result);
            //
            // }
            canvas.refresh();
        } finally {
            model.endUpdate();
        }

    }


}