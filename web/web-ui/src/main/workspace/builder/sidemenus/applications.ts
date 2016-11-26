import {HttpClient} from "aurelia-fetch-client";
import {inject} from "aurelia-framework";

import {ImageDescriptor} from '../../../../model/hal/image'


@inject(HttpClient)
export class Applications {

    private element:HTMLElement;

    private elements: ImageDescriptor[];

    constructor(private client: HttpClient) {

    }

    addImage(imageId: string, e:DragEvent) {
        let event = this.createEvent(imageId, e);
        this.element.dispatchEvent(event);
    }


    public createEvent(id:string, e:DragEvent) : Event {
        var event:Event;

        if((<any>window).CustomEvent) {
            event = new CustomEvent('image-dragged', {
                detail: {
                    value: id,
                    location: {x:e.clientX, y:e.clientY}
                },
                bubbles:true
            });
        } else {
            event = (<any>document).createCustomEvent('image-dragged');
            (<any>event).initCustomEvent('change', true, true, {
                detail: {
                    value: id,
                }
            });
        }
        return event;
    }

    public attached(): void {
        this.client.fetch('docker/images')
            .then(response => response.json())
            .then(elements => {
                this.elements = elements;
                console.log(elements);
            });

    }

}
