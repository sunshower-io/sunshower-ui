import {Marshaller} from "common/lib/io/marshalling";
import Deployment from "./deployment";
import {Credential} from "common/model/security";
import DraftboardMarshaller from "apps/workspaces/services/draftboard/marshallers/marshaller";


class SecretMarshaller implements Marshaller<Credential> {
    write(data: Credential): {} {
        return {
            id: data.id,
            type: 'io.hasli.vault.api.secrets.CredentialSecret'
        }
    }

}


export class DeploymentMarshaller implements Marshaller<Deployment>{
    private secretMarshaller: SecretMarshaller;
    private draftboardMarshaller: DraftboardMarshaller;

    constructor() {
        this.secretMarshaller = new SecretMarshaller();
        this.draftboardMarshaller = new DraftboardMarshaller();
    }

    write(data: Deployment): {} {
        return {
            provider: {
                "key": "aws"
            },
            credential: data.credential.id,
            draftboard: this.draftboardMarshaller.write(data.draftboard)
        }
    }

}