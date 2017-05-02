export class Workspace {

    id          ?: string;
    modified    ?: string;

    constructor(data?:any) {
        Object.assign(this, data);
    }

}

//todo move
export class ImageDataProvider {

    public file?: File;


    bindFiles(files:FileList) {
        if(files && files.length) {
            this.file = files[0];
        }
    }

    imageToFormData() : FormData {
        if(this.file) {
            let formData = new FormData(),
                file = this.file;
            formData.append('file-data', file);
            formData.append('image-name', file.name);
            formData.append('image-type', file.type);
            return formData;
        }
        return null;
    }

}

export class SaveWorkspaceRequest extends ImageDataProvider {
    key         : string;
    name        : string;
    description : string;
    file        ?: File;

    constructor(data?:any) {
        super();
        Object.assign(this, data);
    }


    toFormData() : FormData {
        let formData = new FormData();
        formData.append('name', this.name || '');
        formData.append('key', this.key || this.name || '');
        formData.append('description', this.description || '');
        return formData;
    }

}
