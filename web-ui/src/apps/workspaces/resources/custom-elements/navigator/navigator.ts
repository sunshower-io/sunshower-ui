import 'materialize-css';
import 'mdi/css/materialdesignicons.css!'
import {UUID} from "common/lib/utils/uuid";
import {autoinject} from 'aurelia-framework';
import {NavigatorLevel} from "./navigator-element";
import {WorkspaceNavigator} from "./workspace/workspace-navigator";

@autoinject
export class Navigator {

    private controlId: string       =  UUID.random();

    private navigator               : HTMLElement;
    private navigatorControl        : HTMLElement;


    private currentLevels           : NavigatorLevel[];


    constructor(
        workspaceNavigator:WorkspaceNavigator
    ) {
        this.currentLevels = [
            workspaceNavigator
        ]
    }


    open() : void {

    }

    close() : void {

    }

    attached() : void {
        $(this.navigatorControl).sideNav();
    }

}