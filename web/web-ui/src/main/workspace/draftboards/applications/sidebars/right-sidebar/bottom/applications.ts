import {
    Layer,
    mxUtils,
    mxGeometry
} from 'mxgraph';
import {inject, bindable} from 'aurelia-framework'
import {HttpClient} from "aurelia-fetch-client";
import {ImageDescriptor} from "model/hal/image";

import {Registry} from 'utils/registry'
import {Canvas} from 'canvas/core/canvas';
import {Element} from 'canvas/element/element';
import {CanvasUtilities} from 'canvas/utilities';

import {ApplicationDeployment} from "component/model/deployment";
import {InfrastructureNode} from 'component/model/infrastructure-node';

@inject(HttpClient, Registry)
export class Applications {

    @bindable
    private canvas: Canvas;


    private loading: boolean = true;
    private element: HTMLElement;
    private loader: HTMLElement;


    private elements: ImageDescriptor[];

    constructor(private client: HttpClient,
                private registry: Registry) {

    }


    private getIconUrl(id: string): string {
        return `${this.registry.get(Registry.S3_IMAGES_PATH)}/${id}`;
    }

    activate(canvas: Canvas) {
        this.canvas = canvas;
    }

    setLoading(): void {
        let top = $(this.loader).offset().top,
            wheight = $(window).height(),
            height = wheight - top;
        $(this.loader).height(height);
        this.loading = true;
    }

    private createDragElement(descriptor: ImageDescriptor): HTMLElement {
        let element = document.createElement('div');
        element.style.border = 'dashed black 1px';
        element.style.width = '100px';
        element.style.height = '100px';
        let img = $(`<img src="${this.getIconUrl(descriptor.logo_url.large)}" 
                        width="100px" 
                        height="100px" />
                    `);
        $(element).append(img);
        return element;
    }

    public attached(): void {
        this.setLoading();
        this.client.fetch('docker/images')
            .then(response => response.json() as any)
            .then(elements => {
                this.elements = elements;
                setTimeout(() => {
                    $(this.element).find('.app-drag-target').each((i: number, el: HTMLElement) => {
                        let
                            descriptor = this.elements[i],
                            id = descriptor.pid,
                            element = this.createDragElement(descriptor);
                        let dragSource = mxUtils.makeDraggable(
                            el,
                            this.canvas,
                            (graph: Canvas, event: Event, target: any, x: number, y: number) => {
                                let deployment = new ApplicationDeployment(),
                                    canvas = this.canvas,
                                    registry = this.registry;
                                deployment.applicationId = id;
                                deployment.geometry.x = x;
                                deployment.geometry.y = y;

                                let cparent = CanvasUtilities.resolveParent(
                                    this.canvas,
                                    x,
                                    y,
                                    CanvasUtilities.ofType(InfrastructureNode)
                                    ),
                                    node: InfrastructureNode = null,
                                    defaultParent = canvas.getDefaultParent(),
                                    pparent = canvas.getCellAt(x, y, defaultParent, true, false),
                                    relative = pparent !== defaultParent;

                                try {
                                    canvas.model.beginUpdate();
                                    if (cparent) {
                                        node = cparent as InfrastructureNode;
                                    } else {
                                        node = new InfrastructureNode();
                                        node.geometry = new mxGeometry(x, y, 104, 168);
                                        node.addTo(canvas, pparent, relative);
                                        if(pparent && pparent.addElement) {
                                            let pgeom = pparent.geometry,
                                                px = pgeom.x,
                                                py = pgeom.y;
                                            node.geometry.x = x - px;
                                            node.geometry.y = y - py;
                                            (pparent as Element).addElement(node);
                                        } else {
                                            registry.draftboardManager.add(node);
                                        }
                                    }
                                    node.addElement(deployment);
                                } finally {
                                    canvas.model.endUpdate();
                                }
                            },
                            element, 0, 0, true, true, true
                        );
                        dragSource.gridEnabled = true;
                        dragSource.guidesEnabled = true;
                        setTimeout(() => {
                            this.resize();
                            this.loading = false;
                        });
                    });
                });
            });

        $(window).resize(this.resize);
    }

    private resize = () => {
        let offset = $(this.element).offset();
        if (offset) {

            let top = offset.top,
                wheight = $(window).height(),
                height = wheight - top - 32;
            $(this.element).height(height);
        }
    }
}

