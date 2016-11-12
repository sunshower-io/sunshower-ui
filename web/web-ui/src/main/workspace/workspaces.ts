/**
 * Created by dustinlish on 10/25/16.
 */

import {inject} from "aurelia-dependency-injection";
import {WorkspaceWizard} from "./wizards/workspace-wizard";

@inject(WorkspaceWizard)
export class Workspaces {

    private wizard: WorkspaceWizard;

    constructor(wizard: WorkspaceWizard) {
        this.wizard = wizard;
    }

    public create() {
        this.wizard.show();
    }

    open() {
        location.assign("#/main/workspaces/workspace")
    }

}