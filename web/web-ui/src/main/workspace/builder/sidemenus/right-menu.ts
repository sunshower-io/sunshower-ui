import {HttpClient} from "aurelia-fetch-client";
import {inject} from "aurelia-framework";

class Image {
    large_2x:string;
    large:string;
    small:string;
    small_2x:string;
}

class ImageDescriptor {
    id:string;

    name:string;

    logo_url:Image;

}

@inject(HttpClient)
export class RightMenu {

    private elements:ImageDescriptor[];

    constructor(private client:HttpClient) {

    }

    public attached() :  void {
        this.client.fetch('docker/images')
            .then(response => response.json())
            .then(elements => {
                this.elements = elements;
                console.log(elements);
            });

    }
}