
// import * as $ from 'jquery';
// import 'dropzone';


import {inject, bindable} from 'aurelia-framework';
import {HttpClient} from "aurelia-fetch-client";
@inject(HttpClient)
export class Applications {

    //
    // @bindable
    // element: Fil;

    application:File;

    constructor(private client:HttpClient){}

    attached() : void {
        // this.element.onchange = (e =>  {
        //
        //         let reader = new FileReader();
        //         reader.addEventListener('loadend', e => {
        //             console.log("LOADEND");
        //             this.client.fetch('hfs/application', {
        //                 method: 'post',
        //                 body: reader.result,
        //                 headers: {
        //                     "Content-Type": "application/octet-stream",
        //                 }
        //             })
        //         });
        //         reader.readAsBinaryString(this.element.files[0]);
        // });

        // reader.readAsDataURL(this.application.name)
        // reader.readAsDataURL(this.application);
        // let dropzone = new Dropzone(this.element);
    }

    upload() {
        // this.element.onchange(e => {
        //
        // });

    }
}
