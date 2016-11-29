import {HttpClient} from "aurelia-fetch-client";
import {inject} from "aurelia-framework";

import {ImageDescriptor} from '../../../../model/hal/image'
import {createEvent} from "../../../../utils/events";


@inject(HttpClient)
export class RightMenu {

    private element:HTMLElement;

    private elements: ImageDescriptor[];

    constructor(private client: HttpClient) {

    }

    addImage(id:string, e:DragEvent) {
        let event = createEvent('add-image', {
            value: id,
            location: {
                x:e.clientX,
                y:e.clientY
            }
        });
        this.element.dispatchEvent(event);
    }



    public attached(): void {
        this.client.fetch('docker/images')
            .then(response => response.json())
            .then(elements => {
                this.elements = elements;
            });

    }



}