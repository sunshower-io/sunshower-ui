import {Router} from "aurelia-router";
import {bindable} from 'aurelia-framework';

export interface NavigationComponent {
    reference: string;
    active: boolean;
}


export class NavigatorManager {

    @bindable
    private router: Router;


    public bind(router: Router): void {
        this.router = router;
    }

    public getCurrent(): NavigationComponent {
        return this.router
            .currentInstruction
            .config
            .navModel
            .settings
            .contextComponent;
    }

}