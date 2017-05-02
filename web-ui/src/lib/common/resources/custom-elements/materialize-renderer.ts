import {DOM} from 'aurelia-pal';
import {DialogController} from 'aurelia-dialog';

export module MaterializeRenderer {

}

export class MaterializeRenderer {

    private anchor: Element;
    private modalContainer: HTMLElement;
    private modalOverlay: HTMLElement;
    dialogControllers: DialogController[];

    private stopPropagation: (e: any) => void;
    private closeModalClick: (e: any) => void;

    private escapeKeyEventHandler = (e) => {
        if (e.keyCode === 27) {
            let top = this.dialogControllers[this.dialogControllers.length - 1];
            if (top && top.settings.lock !== true) {
                top.cancel();
            }
        }
    };

    constructor() {
    }

    getDialogContainer(): HTMLElement {
        let result = DOM.createElement('div') as HTMLElement;
        return result;
    }

    showDialog(dialogController: DialogController) {
        // dialogController.settings.overlayDismiss = true;
        // dialogController.settings.rejectOnCancel = true;

        let body = DOM.querySelectorAll('body')[0] as HTMLElement;
        this.anchor = dialogController.slot.anchor;
        this.anchor.classList.add('modal');
        console.log('this.anchor', $(this.anchor));
        body.appendChild(this.anchor);

        return new Promise((resolve) => {
            $(this.anchor).modal();
            $(this.anchor).modal('open');
        });
    }

    hideDialog(dialogController: DialogController) {
        this.anchor.removeEventListener('click', this.stopPropagation);
        $(this.anchor).modal('close');

        return new Promise((resolve) => { }).then(() => {
            dialogController.slot.detached();
            return Promise.resolve();
        });
    }

}