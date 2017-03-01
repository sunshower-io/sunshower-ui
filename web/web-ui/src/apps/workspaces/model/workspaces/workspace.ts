import {File} from 'apps/workspaces/model/io/file';
import {Identifier} from "common/lib/lang";

export class Workspace {
    id: string;

}

export class WorkspaceRevision {


    picture     : File;
    id          : Identifier;

    workspace   : Workspace;
}