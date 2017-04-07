
import {Repository} from "common/model/api/revision/revisions";

import {
    Tag,
    ImageDataProvider,
    FormDataProvider
} from "common/model/api/core";


export type ApplicationTemplate = Application;


export class Application {
    id                  : string;
    name                : string;
    image               : string;
    repository          : Repository;

    tags                : Tag[];


    constructor(data?: any) {
        if (data) {
            Object.assign(this, data);
        }
    }

    addTag(tag: Tag) {
        (this.tags = this.tags || []).push(tag);
    }
}

export class SaveApplicationRequest extends ImageDataProvider implements FormDataProvider {

    name    : string;

    tags    :   Tag[];



    toFormData(): FormData {
        let fd = new FormData();
        fd.append('name', this.name || '');
        return fd;
    }


}
