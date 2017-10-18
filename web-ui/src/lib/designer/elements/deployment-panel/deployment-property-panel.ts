import {DialogController} from "aurelia-dialog";
import {autoinject} from "aurelia-dependency-injection";
import {Router} from "aurelia-router";

@autoinject
export class DeploymentPropertyPanel {

    private router:Router
    
    constructor(
        private dialogController: DialogController,
    ) {
        
    }
    
    activate(router: Router) {
        this.router = router;
    }
    
    save() : void {
        this.dialogController.ok();
        this.router.navigate('deployment')
    }
}