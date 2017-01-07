import {inject, bindable} from 'aurelia-framework'
import {Canvas} from 'canvas/core/canvas';
import {Element} from 'canvas/element/element';
import {CanvasUtilities} from 'canvas/utilities';
import {mxUtils} from 'mxgraph';
import {Registry} from 'utils/registry';
import {InfrastructureManager} from 'component/infrastructure/infrastructure-manager';
@inject(InfrastructureManager, Registry)
export class Components {


    @bindable
    elements:Element[];

    private element:HTMLElement;

    @bindable
    private canvas: Canvas;
    constructor(private manager:InfrastructureManager, private registry:Registry) {

    }

    private createDragElement(descriptor: Element): HTMLElement {
        let element = document.createElement('div');
        element.style.border = 'dashed black 1px';
        element.style.width = '100px';
        element.style.height = '100px';
        let img = $(`<img src="${(descriptor as any).icon}" 
                        width="100px" 
                        height="100px" />
                    `);
        $(element).append(img);
        return element;
    }
    attached() : void {

        setTimeout(() => {
            $(this.element).find('.web-component').each((i: number, el: HTMLElement) => {
                let
                    descriptor = this.elements[i],
                    element = this.createDragElement(descriptor);
                let dragSource = mxUtils.makeDraggable(
                    el,
                    this.canvas,
                    (graph: Canvas, event: Event, target: any, x: number, y: number) => {
                        let deployment = this.manager.get(descriptor.id).copy(),
                            canvas = this.canvas;
                        deployment.geometry.x = x;
                        deployment.geometry.y = y;
                        deployment.geometry.width = 100;
                        deployment.geometry.height = 100;

                        try {
                            canvas.model.beginUpdate();
                            deployment.addTo(canvas, canvas.getDefaultParent(), false);
                            this.registry.draftboardManager.add(deployment);
                            // canvas.addCell(deployment, canvas.getDefaultParent());
                        } finally {
                            canvas.model.endUpdate();
                        }
                    },
                    element, 0, 0, true, true, true
                );
                dragSource.gridEnabled = true;
                dragSource.guidesEnabled = true;
            });
        });
    }

    activate(canvas:Canvas) : void {
        this.canvas = canvas;
        this.elements = this.manager.list();
    }



}