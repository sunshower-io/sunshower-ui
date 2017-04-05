export class Tag {
    id              : string;
    name            : string;
}


export interface FormDataProvider {
    toFormData() : FormData;
}

export class ImageDataProvider {

    public file: File;


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