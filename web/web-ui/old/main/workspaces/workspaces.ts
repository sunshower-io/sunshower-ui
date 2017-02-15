import {Router} from "aurelia-router";

export class Workspaces {

    public theRouter: Router;

    static inject() {
        return [Router];
    }

    constructor(router) {
        this.theRouter = router;
    }

    open() : void {
        this.theRouter.navigate("workspace");
    }

}