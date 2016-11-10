/**
 * Created by dustinlish on 10/25/16.
 */

import {inject} from "aurelia-dependency-injection";
import {WorkspaceWizard} from "./workspace-wizard";

@inject(WorkspaceWizard)
export class Dashboard {

    private wizard: WorkspaceWizard;

    constructor(wizard: WorkspaceWizard) {
        this.wizard = wizard;
    }

    public create() {
        this.wizard.show();
    }

    open() {
        location.assign("#/main/workspace")
    }

}