import {inject} from "aurelia-framework";
import {LocalStorage, Map} from "../../../storage/local/local-storage";
import {HttpClient} from "aurelia-fetch-client";
import {User} from "src/model/core/security";

export const HEADER = "X-AUTH-TOKEN";

export class Token {

    constructor(public token: string,
                public expiration: Date) {

    }

}

@inject(HttpClient, LocalStorage)
export class TokenHolder {

    private static token: User;


    constructor(
        private client:HttpClient,
        private storage: Map<string, string>
    ) {

    }



    public validate() : User {
        if(TokenHolder.token) {
            this.client.fetch('authenticate/validate', {
                method: 'post',
                body: JSON.stringify(TokenHolder.token.token)
            }).then(response => response.json())
                .then(data => {
                    TokenHolder.token = data;
                })
        }
        return TokenHolder.token;
    }

    public get(): User {
        if (TokenHolder.token) {
            return TokenHolder.token;
        } else if (this.storage.get(HEADER)) {
            this.client.fetch('authentication/validate', {
                method:'post',
                body: JSON.stringify(this.storage.get(HEADER))
            }).then(response => response.json())
                .then(data => {
                    TokenHolder.token = data;
                });
            return TokenHolder.token;
        }
        return undefined;
    }

    public set(t: User, remember: boolean) {
        TokenHolder.token = t;
        if (remember) {


            this.storage.put(HEADER, t.token.token);
        }
    }
}


