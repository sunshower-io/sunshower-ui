import * as showdown from 'showdown';
import {Identifier} from "common/lib/lang";
import {autoinject} from "aurelia-framework";
import {HttpClient} from "aurelia-fetch-client";
import {Application} from './application';
import {ApplicationRevision} from "apps/workspaces/model/application";
/**
 * Created by dustinlish on 2/20/17.
 */

@autoinject
export class Summary {

    private applicationRevision: ApplicationRevision;

    constructor(private client: HttpClient, private parent: Application) {

    }

    private summary: HTMLElement;


    activate(identifier: Identifier) {



        let id = identifier.id;

        this.client.fetch(`applications/${id}`)
            .then(t => t.json() as any)
            .then(t => {
                this.applicationRevision = t;
                this.parent.applicationRevision = t;

                this.load(id);
            });
    }

    private load(appId:string): void {
        let revision = this.applicationRevision,
            readme = revision.readme;
        this.client
            .fetch(`applications/${appId}/readme`)
            .then(t => t.json() as any)
            .then(t => {

                let converter = new showdown.Converter();
                this.summary.innerHTML = converter.makeHtml(t.data);




            });
    }

}