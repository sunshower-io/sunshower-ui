import {bindable} from "aurelia-framework";
import {HttpClient} from "aurelia-fetch-client";
import {inject} from "aurelia-dependency-injection";
import {Principal} from "lib/common/security";
import {LocalStorage} from "lib/common/storage";

import {
    Aurelia,
    Container
} from "aurelia-framework";
import {Auth} from "apps/auth/auth";

import {
    Token,
    AuthenticationContextHolder
} from "lib/common/security";
import {Router} from "aurelia-router";
import {UUID} from "lib/common/lang/uuid";

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

    private usernameId: string = UUID.random();

    private passwordId: string = UUID.random();

    @bindable
    private remember: boolean = true;

    @bindable
    private credentialsInvalid: boolean = false;

    @bindable
    private error: string;

    @bindable
    private user: Principal = new Principal();


    constructor(private aurelia: Aurelia,
                private client: HttpClient,
                private holder: AuthenticationContextHolder,
                private storage: LocalStorage,
                private auth: Auth,
                private container: Container,
                private router: Router) {
    }

    attached(): void {
        setTimeout(() => {
            Materialize.updateTextFields();
        }, 100);
        let token = this.storage.get("X-AUTH-TOKEN");
        if (token) {
            this.client.fetch('security/validate', {
                method: 'put',
                body: JSON.stringify(new Token({value:token}))
            });
        }
    }


    login(): void {
        this.client.fetch('security/authenticate', {
            method: 'put',
            body: JSON.stringify(this.user)
        }).then(response => response.json() as any)
            .then(data => {
                if (this.remember) {
                    this.storage.put('X-AUTH-TOKEN', data.token.value);
                    window.location.href = "#/workspaces";
                    window.location.reload(true);

                } else {
                    this.setParam("token", data.token.value);
                    window.location.href = "#/workspaces";
                    window.location.reload(true);
                }
            }).catch(e => {
            this.credentialsInvalid = true;

            if (e.status == 401) {
                this.error = "You have not been approved. We will contact you when you can sign in"
            } else {
                this.error = "We did not recognize this username/password combination. Please try again."
            }
            //may need other message some day
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