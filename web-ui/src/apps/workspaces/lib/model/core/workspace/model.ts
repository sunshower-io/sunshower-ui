export class Workspace {

    id          ?: string;
    key         ?: string;
    name        ?: string;
    description ?: string;
    modified    ?: string;
    created     ?: string;

    constructor(data?:any) {
        Object.assign(this, data);
        if (data) {
            let modified = new Date,
                created = new Date;
            modified.setTime(Date.parse(data["modified-on"]));
            created.setTime(Date.parse(data["created-on"]));
            this.modified = this.month(modified.getMonth()) +
                " " +
                modified.getDate().toString() +
                ", " +
                modified.getFullYear().toString();
            this.created = created.getMonth().toString() +
                " " +
                created.getDate().toString() +
                ", " +
                created.getFullYear().toString();
        }
    }

    month(num: number) : string {
        let monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        return monthNames[num];
    }

    toJSON() {
        return {
            "id": this.id,
            "key": this.key,
            "name": this.name
        };
    }
    //"type": "io.hasli.sdk.v1.ext.hasli.model.WorkspaceElement"

}


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


    public toFormData() : FormData {
        let formData = new FormData();
        formData.append('name', this.name || '');
        formData.append('key', this.key || this.name || '');
        formData.append('description', this.description || '');
        return formData;
    }

}
