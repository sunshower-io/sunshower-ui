import {WorkspaceRevision, Workspace} from "./workspaces/workspace";
import {ApplicationRevision} from "./application/application";
import {Application} from "common/model/api/core/application";
import {autoinject} from "aurelia-dependency-injection";

@autoinject
export class ApplicationContext {

    constructor(
        public workspace:Workspace,
        public workspaceRevision:WorkspaceRevision,
        public application:Application,
        public applicationRevision:ApplicationRevision
    ) {

    }


}