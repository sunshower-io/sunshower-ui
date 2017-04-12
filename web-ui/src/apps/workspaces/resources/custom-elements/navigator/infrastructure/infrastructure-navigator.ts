import {autoinject} from 'aurelia-framework';
import {
    NavigatorLevel,
    AbstractNavigatorLevel
} from "apps/workspaces/resources/custom-elements/navigator/navigator-element";

export class InfrastructureNavigator extends AbstractNavigatorLevel {
    name                = "Infrastructure";
    icon                = "mdi-cloud";
    color               = "teal";
}
