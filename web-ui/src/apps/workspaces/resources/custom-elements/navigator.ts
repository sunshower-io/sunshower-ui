import {Router} from "aurelia-router";
import {bindable} from 'aurelia-framework';
export class NavigatorManager {

    @bindable
    private router:Router;



    public bind(router: Router) : void{
        this.router = router;
    }

}