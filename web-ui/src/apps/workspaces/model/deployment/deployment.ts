import {CredentialSecret} from "common/model/security";
import {Draftboard} from "apps/workspaces/services/draftboard/draftboard";
export default class Deployment {

    constructor(public draftboard      : Draftboard,
                public credential      : CredentialSecret
    ){

    }
}