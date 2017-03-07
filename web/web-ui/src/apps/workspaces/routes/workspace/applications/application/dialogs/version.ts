import {bindable} from "aurelia-framework";
import {HttpClient} from "aurelia-fetch-client";
import {DialogController} from "aurelia-dialog";
import {autoinject} from "aurelia-dependency-injection";

/**
 * Created by dustinlish on 3/6/17.
 */

@autoinject
export class Version {

    date        : Date;
    description : string;
    version     : string;
    tags        : Array<string>;
    status      : string;
    owner       : string;

    @bindable
    currentVersions: Array<Version>;

    private applicationId;

    constructor(private client: HttpClient,
                private dialogController: DialogController) {
    }

    activate(model) {
        this.currentVersions = model.currentVersions;
        this.applicationId = model.applicationId;
    }

    save() {
        this.date = new Date();
        this.tags = ["latest"];

        // this.client.fetch(`applications/${this.applicationId}/revisions`, {
        //     method: 'post',
        //     body: JSON.stringify()
        // }).then(result => {
        // });

        this.close();
    }

    public static getVersionDate(): string {
        let currentDate = new Date();
        return `${currentDate.getDay()}/${currentDate.getDate()}/${currentDate.getFullYear()} 
                at ${currentDate.getHours()}:${currentDate.getMinutes()}`;
    }

    close() {
        this.dialogController.ok(this);
    }
}