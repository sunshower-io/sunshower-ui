import {File} from 'apps/workspaces/model/io'
import {Identifier} from "common/lib/lang";
import {ComputeTemplate} from "common/model/api/hal/compute";
import {CredentialSecret} from "common/model/security/credentials";
import {OperatingSystem} from "common/model/api/hal/api";
export class Application {

    id                  : string;

    revisions           : ApplicationRevision[];
}

export class ApplicationRevision {

    id                      : Identifier;
    name                    : string;

    readme                  : File;
    application             : Application;


    //added by Lisa
    template                : ComputeTemplate;
    credential              : CredentialSecret;
    operatingSystem         : OperatingSystem;
}