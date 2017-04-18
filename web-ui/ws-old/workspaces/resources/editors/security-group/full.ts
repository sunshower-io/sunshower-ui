import {bindable} from "aurelia-framework";
import {ElementEditor} from "common/lib/canvas/element";
import {SecurityGroupElement} from "apps/workspaces/model/components/security-group";

export class FullSecurityGroupEditor implements ElementEditor<SecurityGroupElement> {

    @bindable
    private secGroup:SecurityGroupElement;

    open(securityGroup: SecurityGroupElement) {
        this.secGroup = securityGroup;
    }

}