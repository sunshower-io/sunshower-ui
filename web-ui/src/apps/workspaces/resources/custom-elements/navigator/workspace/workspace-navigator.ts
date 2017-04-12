import {
    RouterNavigationContext,
    NavigationElement
} from "../navigator-element";
import {autoinject} from "aurelia-framework";
import {Router} from "aurelia-router";
import {WorkspaceService} from "common/model/api/workspace/service";

@autoinject
export class WorkspaceNavigator extends RouterNavigationContext {

    private title          : string = 'Workspaces';
    private name           : string = 'Workspaces';

    constructor(
        private workspaceService: WorkspaceService
    ) {
        super();
    }

    public navigate(e:NavigationElement) : void {
        this.router.navigate(e.href);
    }

    hasChildren(): boolean {
        return true;
    }


    load(): Promise<boolean> {
        this.loading = true;
        let children = [];
        return this.workspaceService.initial().then(t => {
            children.push(t);
        }).then(u => {
            return this.workspaceService.list().then(t => {
                children.push(children);
                this.loading = false;
                this.children = this.partition(children, 'Workspaces');
                console.log(this.children);
            }).then(t => true);
        });
    }

}