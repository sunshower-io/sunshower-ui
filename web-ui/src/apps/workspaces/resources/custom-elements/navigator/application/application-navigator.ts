
import {
    NavigationElement,
    RouterNavigationContext
} from "../navigator-element";
import {autoinject} from "aurelia-framework";
import {Router} from "aurelia-router";
import {WorkspaceService} from "common/model/api/workspace/service";
import {bindable} from "aurelia-framework";
import * as _ from "lodash";

@autoinject
export class ApplicationNavigator extends RouterNavigationContext {
    open(): Promise<any> {
        return undefined;
    }


    hasChildren(): boolean {
        return true;
    }

    load(): Promise<boolean> {
        return undefined;
    }

    navigate(e: NavigationElement): void {
    }

}