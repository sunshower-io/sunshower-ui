import {inject} from "aurelia-framework";
import {LocalStorage, Map} from "../../../storage/local/local-storage";
import {HttpClient} from "aurelia-fetch-client";
import {User, AuthenticationContext} from "model/core/security";

export const HEADER = "X-AUTH-TOKEN";

export class Token {

    constructor(public token: string,
                public expiration: Date) {

    }

}

@inject(HttpClient, LocalStorage)
export class AuthenticationContextHolder {

    private static context: AuthenticationContext;


    constructor(
        private client:HttpClient,
        private storage: Map<string, string>
    ) {

    }



    public clear() : void {
        AuthenticationContextHolder.context = null;
        this.storage.remove('X-AUTH-TOKEN');
    }


    public token() :string {

        if(AuthenticationContextHolder.context) {
            let ctx = AuthenticationContextHolder.context;
            if(ctx.token) {
                return ctx.token.token;
            }
        }
        return null;
    }

    public validate(token?:string) : Promise<AuthenticationContext> {
        let t = token || this.token();
        if(t) {
            let tok = new Token(t, new Date());
            return this.client.fetch('authenticate/validate', {
                method: 'post',
                body: JSON.stringify(tok)
            }).then(response => response.json());
        } else {
            return Promise.reject("No token");
        }
    }

    public get(): AuthenticationContext {
        if (AuthenticationContextHolder.context) {
            return  AuthenticationContextHolder.context;
        } else if (this.storage.get(HEADER)) {
            this.client.fetch('authentication/validate', {
                method:'post',
                body: JSON.stringify(this.storage.get(HEADER))
            }).then(response => response.json())
                .then(data => {
                    AuthenticationContextHolder.context = data;
                });
            return AuthenticationContextHolder.context;
        }
        return undefined;
    }

    public set(t: AuthenticationContext, remember: boolean) {
        AuthenticationContextHolder.context = t;
        if (remember) {
            this.storage.put(HEADER, this.token());
        }
    }
}


