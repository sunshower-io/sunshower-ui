import {bindable} from "aurelia-framework";
import {HttpClient} from "aurelia-fetch-client";
import {inject} from "aurelia-dependency-injection";
import {User} from "../../model/core/security/user";
import {LocalStorage} from "../../storage/local/local-storage";
import {Token} from "../../model/core/security/token";
import {Aurelia} from "aurelia-framework";
import {Auth} from "../auth";

@inject(Aurelia, HttpClient, LocalStorage, Auth)
export class Login {


    @bindable
    private user: User = new User();

    constructor(
        private aurelia: Aurelia,
        private client: HttpClient,
        private storage: LocalStorage,
        private auth: Auth
    ) {

    }

    attached(): void {
        $('.ui.checkbox').checkbox();

        let token = this.storage.get("X-AUTH-TOKEN");
        if (token) {
            this.client.fetch('authenticate/validate', {
                method:'post',
                body: JSON.stringify(new Token(token, null))
            }).then(response => response.json())
                .then(data => {
                    this.auth.setAppRoot();
                })
        }
    }

    login(): void {
        this.client.fetch('authenticate/authenticate', {
            method: 'post',
            body: JSON.stringify(this.user)
        }).then(response => response.json())
            .then(data => {
                this.storage.put("X-AUTH-TOKEN", data.token);
            });

        this.auth.setAppRoot();
    }


}