import {inject} from 'aurelia-framework';
import {Canvas} from 'common/lib/canvas';
import {Element} from 'common/lib/canvas/element';


import {bindable} from 'aurelia-framework';
import {
    mxUtils
} from 'mxgraph';

import {Registry} from 'common/lib/utils';
import {BlockElement} from "apps/workspaces/model/components/block";
import {BlockManager} from "apps/workspaces/services/blocks/block";
import {DraftboardManager} from "apps/workspaces/services/draftboard/draftboard";

@inject(Registry)
export class Blocks {

    private element: HTMLElement;

    private elements: BlockElement[];

    @bindable
    private canvas: Canvas;

    private blockManager: BlockManager;

    constructor(private registry: Registry) {
        this.blockManager = registry.get(BlockManager) as BlockManager;
    }

    activate(canvas: Canvas) {
        this.canvas = canvas;
    }

    private resize = () => {
        let offset = $(this.element).offset();
        if (offset) {
            let top = offset.top,
                wheight = $(window).height(),
                height = wheight - top - 32;
            $(this.element).height(height);
        }
    };


    addRecursively(canvas: Canvas, parent: Element, x: number, y: number, relative: boolean): void {
        for (let child of parent.getSuccessors()) {
            child.addTo(canvas, parent, false);
            this.addRecursively(canvas, child, x, y, false);
        }
    }


    attached(): void {
        this.resize();
        $(window).resize(this.resize);
        this.elements = this.blockManager.list();


        setTimeout(() => {
            $(this.element).find('.app-drag-target').each((i: number, el: HTMLElement) => {
                let element = document.createElement('div'),
                    descriptor = this.elements[i],
                    id = descriptor.id,
                    draftboardManager = this.registry.get(DraftboardManager) as DraftboardManager,
                    icon = descriptor.icon;
                element.style.border = 'dashed black 1px';
                element.style.width = '100px';
                element.style.height = '100px';

                let img = $(`<img src="${icon}" width="100px" height="100px" />`);
                $(element).append(img);


                let dragSource = mxUtils.makeDraggable(
                    el,
                    this.canvas,
                    (graph: Canvas, event: Event, target: any, x: number, y: number) => {
                        let block = this.elements[i];


                        this.canvas.getModel().beginUpdate();
                        try {
                            let copy = block.copy();
                            copy.geometry.x = x;
                            copy.geometry.y = y;
                            copy.addTo(this.canvas, this.canvas.getDefaultParent(), false);
                            draftboardManager.add(copy as BlockElement);
                            this.addRecursively(this.canvas, copy, x, y, true);
                        }
                        finally {
                            this.canvas.getModel().endUpdate();
                        }
                    },
                    element,
                    0,
                    0,
                    true,
                    true,
                    true
                );
                dragSource.gridEnabled = true;
                dragSource.guidesEnabled = true;
                setTimeout(() => {
                    this.resize();
                });
            });

            $(window).resize(this.resize);

        })

    }
}
