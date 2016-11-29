import {HttpClient} from "aurelia-fetch-client";
import {inject} from "aurelia-framework";

import {ImageDescriptor} from '../../../../model/hal/image'


@inject(HttpClient)
export class RightMenu {

    private element:HTMLElement;

    private elements: ImageDescriptor[];

    constructor(private client: HttpClient) {

    }

    addImage(imageId: string) {
        let event = this.createEvent(imageId);
        this.element.dispatchEvent(event);
    }


    public createEvent(id:string) : Event {
        var event:Event;

        if((<any>window).CustomEvent) {
            event = new CustomEvent('image-dragged', {
                detail: {
                    value: id,
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
            });

    }



}