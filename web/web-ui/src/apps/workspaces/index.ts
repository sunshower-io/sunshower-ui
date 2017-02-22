import {Router} from "aurelia-router";

export class Workspace {

    public router: Router;

    static inject() {
        return [Router];
    }

    constructor(router) {
        this.router = router;
    }

    open() : void {
        this.router.navigate("workspace/4/applications");
    }

}