import {autoinject} from "aurelia-framework";
import {HttpClient} from "aurelia-fetch-client";
/**
 * Created by dustinlish on 2/22/17.
 */

@autoinject
export class Output {

    lines:string[];

    constructor(private client:HttpClient) {

    }

    activate(items:any, p:any, c:any) : void {
        this.lines = [];
        let id = c.queryParams.id;

        let websocket = new WebSocket(`ws://${location.host}/hasli/api/docker/events`);
        if(id) {
            websocket.onopen = (e:Event) => {
                this.client.fetch(`docker/${id}/deploy`, {
                    method: 'post'
                }).then(r => r.json() as any)
                    .then(r => this.lines.push(r.payload));
            };
        }
        websocket.onmessage = (e:Event) => {
            let data = JSON.parse((e as any).data);
            this.lines.push(data.payload);
        }
    }

}