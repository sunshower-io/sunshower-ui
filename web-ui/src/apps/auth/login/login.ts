import {bindable} from "aurelia-framework";
import {HttpClient} from "aurelia-fetch-client";
import {inject} from "aurelia-dependency-injection";
import {User} from "common/model/security";
import {LocalStorage} from "common/lib/storage/local";

import {
    Aurelia,
    Container
} from "aurelia-framework";
import {Auth} from "apps/auth/auth";

import {
    Token,
    AuthenticationContextHolder
} from "common/model/security";


@inject(
    Aurelia,
    HttpClient,
    AuthenticationContextHolder,
    LocalStorage,
    Auth,
    Container
)
export class Login {


    @bindable
    private remember: boolean = true;

    @bindable
    private credentialsInvalid: boolean = false;

    @bindable
    private user: User = new User();


    constructor(private aurelia: Aurelia,
                private client: HttpClient,
                private holder: AuthenticationContextHolder,
                private storage: LocalStorage,
                private auth: Auth,
                private container: Container,) {
    }

    attached(): void {
        $('.ui.checkbox').checkbox();
        let token = this.storage.get("X-AUTH-TOKEN");
        if (token) {
            this.client.fetch('authenticate/validate', {
                method: 'post',
                body: JSON.stringify(new Token(token, null))
            }).then(response => response.json())
                .then(data => {
                    // this.holder.set(data, true);
                    // console.log("USER1", data.user)
                    // this.container.registerInstance(User, data.user);
                    // let headers = this.client.defaults.headers as Object;
                    // headers['X-AUTH-TOKEN'] = data.token.token;
                    // this.auth.setAppRoot();
                })
        }
    }


    login(): void {
        this.client.fetch('authenticate/authenticate', {
            method: 'post',
            body: JSON.stringify(this.user)
        }).then(response => response.json() as any)
            .then(data => {
                if (this.remember) {
                    this.storage.put('X-AUTH-TOKEN', data.token.token);
                    window.location.reload(true);
                } else {
                    this.setParam("token", data.token.token);
                }
            }).catch(e => {
            this.credentialsInvalid = true;
        });
    }


    setParam(name: string, v: string) {
        let location = window.location.href,
            value = encodeURIComponent(v),
            pattern = new RegExp(`[&\\?]${name}=`);
        if (pattern.test(location)) {
            pattern = new RegExp(`[&\\?]${name}=\\d+`);
            window.location.href = location.replace(pattern, `$1${name}=${value}`);
        }
        else {
            if (location.indexOf("?") != -1) {
                window.location.href = `${location}&${name}=${value}`;
            }
            else {
                window.location.href = `${location}?${name}=${value}`;
            }
        }
    }


}