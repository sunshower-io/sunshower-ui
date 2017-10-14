declare module 'aurelia-dialog' {

    export class Renderer {

        getDialogContainer() : HTMLElement;

        showDialog(dialogController:DialogController) : Promise<any>;

        hideDialog(dialogController: DialogController);
    }

    export class DialogConfiguration {
        useRenderer(renderer: any);

    }


    export class DialogController {
        slot                :any;
        settings            :any;

        ok(whatever?:any)   : void;
        cancel()            : void;
        centerDialog        : () => void;
    }

    export class DialogService {
        open(a:any) : Promise<any>;

    }

}