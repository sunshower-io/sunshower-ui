import {inject} from 'aurelia-framework'
import {HttpClient} from "aurelia-fetch-client";
import {createEvent} from "../../../../../../../utils/events";
import {ImageDescriptor} from "../../../../../../../model/hal/image";

@inject(HttpClient)
export class Applications {

    private element:HTMLElement;

    private elements: ImageDescriptor[];

    constructor(private client:HttpClient) {

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

                let top = $(this.element).offset().top,
                    wheight = $(window).height(),
                    height = wheight - top;
                $(this.element).height(height);

            });

    }

}