import {bindable} from "aurelia-framework";
import {HttpClient} from "aurelia-fetch-client";
import {inject} from "aurelia-dependency-injection";
import {User} from "common/model/security";
import {LocalStorage} from "common/lib/storage/local";
import {UUID} from "common/lib/utils/uuid";

import * as materialize from 'materialize-css';

import {
    Aurelia,
    Container
} from "aurelia-framework";
import {Auth} from "apps/auth/auth";

import {
    Token,
    AuthenticationContextHolder
} from "common/model/security";
import {Router} from "aurelia-router";


@inject(
    Aurelia,
    HttpClient,
    AuthenticationContextHolder,
    LocalStorage,
    Auth,
    Container,
    Router
)
export class Login {

    private usernameId: string       =  UUID.random();
    private passwordId: string       =  UUID.random();

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
                private container: Container,
                private router: Router) {
    }

    attached(): void {
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
                    window.location.reload(true);
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

    signUp() : void {
        this.router.navigateToRoute('signup')
    }


}