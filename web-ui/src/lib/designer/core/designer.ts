import {Point2D} from "lib/common/math";
import {Canvas} from 'lib/designer/canvas';
import {CanvasModel} from 'lib/designer/model';
import {CanvasSelector} from "./selector";
import {UndoAction} from "lib/designer/canvas/actions/undo-action";
import {RedoAction} from "lib/designer/canvas/actions/redo-action";
import {SaveAction} from "lib/designer/canvas/actions/save-action";
import {TaskGraph} from "lib/designer/model/graph/graph-element";
import {DesignerLoader} from "./loader";
import {Codec} from 'lib/designer/codec';
import {JsonCodec} from "lib/designer/codec/json-codec";
import {DeleteSelectionAction} from "lib/designer/canvas/actions/delete-action";

export class Designer {

    private codec       : Codec;
    private canvas      : Canvas;
    private loading     : boolean;

    private loader: DesignerLoader;


    constructor(
        private readonly container: HTMLElement,
        private readonly model: CanvasModel = new CanvasModel(),
        options?: DesignerOptions
    ) {
        let canvas = new Canvas(container, model),
            selector = new CanvasSelector(canvas, container);
        this.canvas = canvas;


        this.canvas.register({
            key: 'save-all',
            name: 'save',
            values: ['ctrl', 's']
        }, new SaveAction());

        this.canvas.register({
            key: 'delete-selected',
            name: 'delete',
            values: ['delete']
        }, new DeleteSelectionAction());

        this.canvas.register({
            key: 'undo',
            name: 'undo',
            values: ['ctrl', 'z']
        }, new UndoAction());


        this.canvas.register({
            key: 'redo',
            name: 'redo',
            values: ['ctrl', 'y']
        }, new RedoAction());
    }

    setCodec(c: Codec) {
        this.codec = c;
    }

    activate() : void {
        this.canvas.activate();
    }

    deactivate() : void {
        this.canvas.deactivate();
    }




    setGraph(graph: TaskGraph) : void {
        if(!this.codec) {
            throw new Error("No codec provided");
        }
        this.codec.import(this.canvas, graph);
    }




    undo() : void {
        this.canvas.undo();
    }

    redo() : void {
        this.canvas.redo();
    }

    getCanvas() : Canvas {
        return this.canvas;
    }

    setLoading() : void {
        this.loader = new DesignerLoader(this.container);
        this.loader.setLoading();
    }

    removeLoading() : void {
        this.loader.removeLoading();
    }

}


export class DesignerOptions {

    width                   ?: number;
    height                  ?: number;


    relativeLocation        ?: Point2D;
}
