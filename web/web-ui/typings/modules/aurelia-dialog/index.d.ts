declare module 'aurelia-dialog' {

    export class Renderer {

        getDialogContainer() : HTMLElement;

        showDialog(dialogController:DialogController) : Promise<any>;

        hideDialog(dialogController: DialogController);
    }

    export class DialogConfiguration {
        useRenderer(renderer: any);

    }


    export interface DialogController {
        slot                :any;
        settings            :any;

        cancel()            : void;
        centerDialog        : () => void;
    }

    export class DialogService {
        open(a:any) : Promise<any>;

    }

}