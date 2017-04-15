
import {
    NavigationElement,
    RouterNavigationContext
} from "../navigator-element";
import {autoinject} from "aurelia-framework";
import {WorkspaceService} from "common/model/api/workspace/service";
import {bindable} from "aurelia-framework";
import {RootNavigator} from "./root-navigator";

@autoinject
export class WorkspaceNavigator extends RouterNavigationContext {

    @bindable
    name            : string = '';

    constructor(
        private workspaceService:WorkspaceService,
        public parent:RootNavigator
    ) {
        super();
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