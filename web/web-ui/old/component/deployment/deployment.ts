import {Draftboard} from "component/draftboard/draftboard";
import {CredentialSecret} from "model/core/secret/credentials";
export default class Deployment {

    constructor(public draftboard      : Draftboard,
                public credential      : CredentialSecret
    ){

    }
}