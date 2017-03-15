import {User} from "model/core/security/user";

export class Secrets {
    static Credential =
        "io.hasli.vault.api.secrets.CredentialSecret"
}
export class CredentialSecret {

    id: string;

    name:string;

    secret:string;

    credential:string;

    user:User;

    type: string = Secrets.Credential
}