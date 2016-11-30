import {HttpClient} from "aurelia-fetch-client";
import {inject} from "aurelia-framework";
import {createEvent} from '../../../../../utils/events';

import {ImageDescriptor} from '../../../../../model/hal/image'


@inject(HttpClient)
export class Applications {

    private element:HTMLElement;

    private elements: ImageDescriptor[];

    constructor(private client: HttpClient) {

    }

    addImage(imageId: string, e:DragEvent) {
        let event = createEvent('image-dragged', {
            value:imageId,
            location:{x:e.clientX, y:e.clientY}
        });
        this.element.dispatchEvent(event);
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
