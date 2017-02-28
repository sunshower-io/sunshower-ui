import {autoinject} from 'aurelia-framework';
import {Workspace} from "apps/workspaces/routes/workspace/index";
import {HttpClient} from "aurelia-http-client";
import {UUID} from "common/lib/utils/uuid";

@autoinject
export class Create {

    private imageElement: HTMLInputElement;

    private name:string;
    private loading:boolean;
    private description:string;


    constructor(private parent: Workspace, private client: HttpClient) {


    }

    activate(): void {
        this.parent.setMenuVisible(false);
    }


    create(): void {
        this.loading = true;
        let form = new FormData();
        let fd = form as any;

        form.append('name', this.name);
        fd.append('image', this.imageElement.files[0]);
        form.append('image-name', this.imageElement.files[0].name);
        form.append('description', this.description);
        form.append('image-type', this.imageElement.files[0].type);
        this.client.post('workspaces/save', form)
            .then(t => {
                this.loading = false;
                this.parent.router.navigate('/');
            });
    }

    onchange(): void {

        console.log(this.imageElement.files[0].type);
    }


}