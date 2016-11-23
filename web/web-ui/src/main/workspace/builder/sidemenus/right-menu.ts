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
        let event = this.createEvent(imageId, 'image-dragged');
        this.element.dispatchEvent(event);
    }

    editImage(imageId: string) {
        let event = this.createEvent(imageId, 'image-edited');
        this.element.dispatchEvent(event);
    }


    public createEvent(id:string, eventName:string) : Event {
        var event:Event;

        if((<any>window).CustomEvent) {
            event = new CustomEvent(eventName, {
                detail: {
                    value: id,
                },
                bubbles:true
            });
        } else {
            event = (<any>document).createCustomEvent(eventName);
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