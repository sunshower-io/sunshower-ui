import {Materialize} from 'materialize-css';

import {
    NavigationElement,
    RouterNavigationContext, LinkObject
} from "../navigator-element";
import {autoinject} from "aurelia-framework";
import {bindable} from "aurelia-framework";
import {RootNavigator} from "./root-navigator";
import {Workspace, SaveWorkspaceRequest} from "common/model/api/workspace/model";
import {WorkspaceService} from "common/model/api/workspace/service";
import {Router} from "aurelia-router";
import {CreateWorkspaceObject, WorkspaceLinkObject} from "./workspace-elements";

@autoinject
export class WorkspaceNavigator extends RouterNavigationContext {

    @bindable
    name: string = '';

    constructor(public parent: RootNavigator,
                public workspaceService: WorkspaceService) {
        super();
        this.searchable = true;
    }

    createRef(input: string): LinkObject {
        return new CreateWorkspaceObject(
            this.workspaceService,
            input,
            this.router
        );
    }

    search(input: string): Promise<LinkObject[]> {
        return this.workspaceService.search(input)
            .then(t => t.map(u => new WorkspaceLinkObject(
                u,
                this.router.parent,
                this.workspaceService
            )));
    }


    hasChildren(): boolean {
        return true;
    }

    load(): Promise<boolean> {
        this.name = this.workspaceService.workspace.name;
        return Promise.resolve(true);
    }

    navigate(e: NavigationElement): void {

    }

    open(): Promise<any> {
        return Promise.resolve(this
            .router
            .parent
            .navigate(`workspace/${this.workspaceService.workspace.id}`)
        );
    }
}

