
import {
    NavigationElement,
    RouterNavigationContext, LinkObject
} from "../navigator-element";
import {autoinject} from "aurelia-framework";
import {bindable} from "aurelia-framework";
import {RootNavigator} from "./root-navigator";
import {Workspace} from "common/model/api/workspace/model";
import {WorkspaceService} from "common/model/api/workspace/service";

@autoinject
export class WorkspaceNavigator extends RouterNavigationContext {

    @bindable
    name            : string = '';

    constructor(
        private workspaceService:WorkspaceService,
        public parent:RootNavigator
    ) {
        super();
        this.searchable = true;
    }

    createRef(input: string): LinkObject {
        return new CreateWorkspaceObject(this, input);
    }

    search(input: string): Promise<LinkObject[]> {
        return this.workspaceService.search(input)
            .then(t => t.map(u => new WorkspaceLinkObject(u, this)));
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
            .navigate(`workspace/${this.workspaceService.workspace.id}`)
        );
    }
}

export class CreateWorkspaceObject implements LinkObject {
    name                : string;

    constructor(nav: WorkspaceNavigator, name:string) {
        this.name = `Nothing named ${name} found.  Create it?`
    }

    open(): Promise<any> {
        return undefined;
    }
}

export class WorkspaceLinkObject implements LinkObject {
    name            : string;


    constructor(
        private workspace:Workspace,
        private navigator:WorkspaceNavigator
    ) {
        this.name = `${workspace.name} (key: ${workspace.key})`;
    }

    open() : Promise<any> {
        return Promise.resolve([]);
    }

}