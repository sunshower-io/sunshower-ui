import {
    NavigationElement,
    RouterNavigationContext
} from "../navigator-element";
import {autoinject} from "aurelia-framework";
import {Router} from "aurelia-router";
import {WorkspaceService} from "common/model/api/workspace/service";
import {bindable} from "aurelia-framework";

@autoinject
export class WorkspaceNavigator extends RouterNavigationContext {

    @bindable
    private create         : boolean = true;
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
            (t as any).key = 'Initial';
            children.push(t);
        }).then(u => {
            console.log('this', this);
            return this.workspaceService.list().then(t => {
                children = children.concat(t);
                this.loading = false;
                this.children = this.partition(children, 'Initial');
                console.log(this.children);
            }).then(t => true);
        });
    }

}