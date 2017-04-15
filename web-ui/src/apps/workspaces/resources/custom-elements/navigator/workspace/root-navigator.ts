import * as _ from "lodash";
import {
    NavigationElement,
    RouterNavigationContext, LinkObject
} from "../navigator-element";
import {autoinject} from "aurelia-framework";
import {WorkspaceService} from "common/model/api/workspace/service";
import {bindable} from "aurelia-framework";
import {
    WorkspaceLinkObject,
    CreateWorkspaceObject
} from "./workspace-elements";

@autoinject
export class RootNavigator extends RouterNavigationContext {

    @bindable
    public  create         : boolean = true;
    public  icon           : string = "mdi-android-studio";
    public  color          : string = "default-color";
    public  title          : string = 'Workspaces';
    public  name           : string = 'Workspaces';

    constructor(
        private workspaceService: WorkspaceService
    ) {
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
                this.router,
                this.workspaceService
            )));
    }


    public open(): Promise<any> {
        return Promise.resolve(this.router.navigate('#/workspaces'));
    }

    public navigate(e:NavigationElement) : void {
        console.log("NAV", e);
        this.router.navigate(`workspace/${e.id}`);
    }

    hasChildren(): boolean {
        return true;
    }


    load(): Promise<any> {
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
                this.children = this.partition(_.uniqBy(children, 'id'), 'Initial');
            }).then(t => this.children);
        });
    }

}