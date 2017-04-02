import {Repository} from "common/model/api/revision/revisions";
import {ImageDataProvider, FormDataProvider} from "common/model/api/core";


export type ApplicationTemplate = Application;


export class Application {
    id: string;
    name: string;
    repository: Repository;


    constructor(data?: any) {
        if (data) {
            Object.assign(this, data);
        }
    }
}

export class SaveApplicationRequest extends ImageDataProvider implements FormDataProvider {

    name: string;

    toFormData(): FormData {
        let fd = new FormData();
        fd.append('name', this.name || '');
        return fd;
    }


}
