import {inject} from "aurelia-framework";
import {LocalStorage, Map} from "../../../storage/local/local-storage";
import {HttpClient} from "aurelia-fetch-client";

export const HEADER = "X-AUTH-TOKEN";

export class Token {

    constructor(public token: string,
                public expiration: Date) {

    }

}

@inject(HttpClient, LocalStorage)
export class TokenHolder {

    private static token: Token;


    constructor(
        private client:HttpClient,
        private storage: Map<string, string>
    ) {

    }



    public validate() : Token {
        if(TokenHolder.token) {
            this.client.fetch('authenticate/validate', {
                method: 'post',
                body: JSON.stringify(TokenHolder.token)
            }).then(response => response.json())
                .then(data => {
                    TokenHolder.token = data;
                })
        }
        return TokenHolder.token;
    }

    public get(): Token {
        if (TokenHolder.token) {
            return TokenHolder.token;
        } else if (this.storage.get(HEADER)) {
            TokenHolder.token = new Token(
                this.storage.get(HEADER),
                new Date()
            );
            return TokenHolder.token;
        }
        return undefined;
    }

    public set(t: Token, remember: boolean) {
        TokenHolder.token = t;
        if (remember) {
            this.storage.put(HEADER, t.token);
        }
    }
}


