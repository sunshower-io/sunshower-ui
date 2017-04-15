
import {ImageDataProvider} from "common/model/api/core";

export class Workspace {
    public id           : string;
    public name         : string;
    constructor(data?:any) {
        Object.assign(this, data);
    }
}

export class SaveWorkspaceRequest extends ImageDataProvider {
    key         : string;
    name        : string;
    file        : File;



    toFormData() : FormData {
        let formData = new FormData();
        formData.append('name', this.name || '');
        formData.append('key', this.key || this.name || '');
        return formData;
    }



}

