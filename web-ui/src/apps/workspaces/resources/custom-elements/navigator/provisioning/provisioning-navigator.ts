import {autoinject} from 'aurelia-framework';
import {
    NavigatorLevel,
    AbstractNavigatorLevel
} from "apps/workspaces/resources/custom-elements/navigator/navigator-element";

export class ProvisioningNavigator extends AbstractNavigatorLevel {
    name                = "Provisioning";
    icon                = "mdi-cube-send"; //"mdi-cloud-tags"
    color               = "amber";
}
