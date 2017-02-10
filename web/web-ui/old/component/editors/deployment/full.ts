import {ElementEditor} from "canvas/element/element";
import {ApplicationDeployment} from "component/model/deployment";

export class FullApplicationDeploymentEditor implements
    ElementEditor<ApplicationDeployment> {
    private applicationDeployment: ApplicationDeployment;

    open(e: ApplicationDeployment): void {
        this.applicationDeployment = e;
    }

}