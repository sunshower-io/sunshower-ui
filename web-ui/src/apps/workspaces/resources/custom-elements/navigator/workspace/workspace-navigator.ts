import {autoinject} from 'aurelia-framework';
import {
    NavigatorLevel,
    AbstractNavigatorLevel
} from "apps/workspaces/resources/custom-elements/navigator/navigator-element";
import {ApplicationNavigator} from "apps/workspaces/resources/custom-elements/navigator/applications/application-navigator";
import {ProvisioningNavigator} from "apps/workspaces/resources/custom-elements/navigator/provisioning/provisioning-navigator";
import {InfrastructureNavigator} from "apps/workspaces/resources/custom-elements/navigator/infrastructure/infrastructure-navigator";


@autoinject
export class WorkspaceNavigator extends AbstractNavigatorLevel {

    name            : string = "Workspaces";
    icon            : string = "mdi-android-studio";


    children        : NavigatorLevel[];

    constructor(
        applicationNavigator:ApplicationNavigator,
        provisioningNavigator: ProvisioningNavigator,
        infrastructureNavigator: InfrastructureNavigator
    ) {
        super();
        this.children = [
            applicationNavigator,
            infrastructureNavigator,
            provisioningNavigator
        ]
    }
}