import {DOM} from 'aurelia-pal';
import {transient} from 'aurelia-dependency-injection';
import {Renderer, DialogController} from 'aurelia-dialog';

export module SemanticUIRenderer {

}

export class SemanticUIRenderer {

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
        let body = DOM.querySelectorAll('body')[0] as HTMLElement;
        this.anchor = dialogController.slot.anchor;
        this.anchor.classList.add('ui', 'small', 'basic', 'modal');
        return new Promise((resolve) => {
            $(this.anchor).modal('show');
        });
    }

    hideDialog(dialogController: DialogController) {
        this.anchor.removeEventListener('click', this.stopPropagation);
        $(this.anchor).modal('hide');

        return new Promise((resolve) => { }).then(() => {
            dialogController.slot.detached();
            return Promise.resolve();
        });
    }

}


