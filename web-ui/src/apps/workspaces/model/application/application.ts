import {File} from 'apps/workspaces/model/io'
import {Identifier} from "common/lib/lang";
import {Application} from "common/model/api/core/application";


export class ApplicationRevision {

    id                      : Identifier;
    name                    : string;

    readme                  : File;
    application             : Application;


    requirements            : Requirement[];

    constructor() {
        this.requirements = [];
    }

}

export interface Requirement {

}

export class ApplicationRevisionDeployer {
    name        : string;
    icon        : string;
}