/**
 * Created by dustinlish on 2/6/17.
 */

import {autoinject} from "aurelia-framework";
import {Workspaces} from "apps/workspaces/routes/workspace/index";
@autoinject
export class Dashboard {

    activate(id:any) : void {
        console.log("dashboard", id)


    }
}