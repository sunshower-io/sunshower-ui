import {ElementEditor} from "common/lib/canvas/element";
import {ApplicationDeployment} from "apps/workspaces/model/components/deployment";

export class FullApplicationDeploymentEditor implements
    ElementEditor<ApplicationDeployment> {
    private applicationDeployment: ApplicationDeployment;

    open(e: ApplicationDeployment): void {
        this.applicationDeployment = e;
    }

}