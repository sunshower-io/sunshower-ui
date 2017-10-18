
import {
    child,
    bindable,
    customElement,
    autoinject,
    containerless,
    useShadowDOM
} from "aurelia-framework";
import {Router} from "aurelia-router";
import {DialogService} from "aurelia-dialog";
import {DeploymentPropertyPanel} from "../deployment-panel/deployment-property-panel";

@containerless
@customElement("action-button")
export class DesignerActionButton {

    @bindable
    active: boolean = true;

    constructor(
        private router: Router, 
        private dialogService:DialogService
    ) {
    }

    deploy() : void {
        
        this.dialogService.open({
            viewModel: DeploymentPropertyPanel,
            model: this.router
        }).then(t => {
            this.router.navigate('deployment');
            return t.closeResult;
        });
    }

}
