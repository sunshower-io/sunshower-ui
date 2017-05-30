import {NavigationInstruction, Router} from "aurelia-router";
export class Breadcrumb {
    title: string;
    href: string;

    constructor(public router: Router,
                public instruction: NavigationInstruction) {

        if (instruction.config.navModel.title) {
            this.title = instruction.router.transformTitle(instruction.config.navModel.title);
                this.href = '#' + instruction.config.navModel.router.baseUrl + instruction.config.navModel.relativeHref
        }

        if ((instruction.router as any).title) {
            let wsid = instruction.router.currentInstruction.params.workspaceId;
            this.title = instruction.router.transformTitle((instruction.router as any).title);
                this.href = '#' + instruction.router.baseUrl + (wsid ? "/" + wsid : "")
        }
    }


    open(): void {
        let instr = this.instruction,
            router = this.router;
        router.navigate(instr.fragment, instr.options);
    }
}

