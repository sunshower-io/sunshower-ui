import {
    NavigationElement,
    RouterNavigationContext
} from "../navigator-element";
import {autoinject} from "aurelia-framework";
import {WorkspaceService} from "common/model/api/workspace/service";
import {bindable} from "aurelia-framework";
import * as _ from "lodash";

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
    }

    public open(): Promise<any> {
        return Promise.resolve(this.router.navigate('#/workspaces'));
    }

    public navigate(e:NavigationElement) : void {
        this.router.navigate(`workspace/${e.id}`);
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
                this.children = this.partition(_.uniqBy(children, 'id'), 'Initial');
            }).then(t => true);
        });
    }

}