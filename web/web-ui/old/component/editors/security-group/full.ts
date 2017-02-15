import {bindable} from "aurelia-framework";
import {ElementEditor} from "canvas/element/element";
import {SecurityGroupElement} from "component/model/security-group";

export class FullSecurityGroupEditor implements ElementEditor<SecurityGroupElement> {

    @bindable
    private secGroup:SecurityGroupElement;

    open(securityGroup: SecurityGroupElement) {
        this.secGroup = securityGroup;
    }

}