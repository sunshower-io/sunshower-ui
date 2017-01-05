import {Layer, mxUtils} from 'mxgraph';
import {inject, bindable} from 'aurelia-framework'
import {HttpClient} from "aurelia-fetch-client";
import {createEvent} from "utils/events";
import {ImageDescriptor} from "model/hal/image";

import {Registry} from 'utils/registry'

import {
    EditorOperation,
    EditorContext,
} from 'main/workspace/draftboards/editor';

import {Canvas} from 'canvas/core/canvas';

import {ApplicationDeployment} from "component/model/deployment";

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

    public attached(): void {
        this.setLoading();
        this.client.fetch('docker/images')
            .then(response => response.json() as any)
            .then(elements => {
                let self = this;
                this.elements = elements;

                setTimeout(() => {
                    $(this.element).find('.app-drag-target').each((i: number, el: HTMLElement) => {
                        let element = document.createElement('div'),
                            descriptor = this.elements[i],
                            id = descriptor.pid;
                        element.style.border = 'dashed black 1px';
                        element.style.width = '100px';
                        element.style.height = '100px';

                        let img = $(`
                                <img src="${this.getIconUrl(descriptor.logo_url.large)}" width="100px" height="100px" />
                        `);
                        $(element).append(img);


                        let dragSource = mxUtils.makeDraggable(
                            el,
                            this.canvas,
                            (graph: Canvas, event: Event, target: any, x: number, y: number) => {
                                let deployment = new ApplicationDeployment();
                                deployment.applicationId = id;
                                console.log('x', x, 'y', y);
                                deployment.geometry.x = x;
                                deployment.geometry.y = y;
                                deployment.addTo(this.canvas, this.canvas.getDefaultParent());

                                // deployment.satisfy({
                                //     host: null,
                                //     graph: this.canvas,
                                //     location: {x: x, y: y},
                                // });

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
                            this.loading = false;
                        }) ;
                    });
                });
            });

        $(window).resize(this.resize);
    }

    private resize = () => {
        let offset = $(this.element).offset();
        if(offset) {

            let top = offset.top,
                wheight = $(window).height(),
                height = wheight - top - 32;
            $(this.element).height(height);
        }
    }
}

