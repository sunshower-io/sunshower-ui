import {
    bindable
} from 'aurelia-framework';

export class WorkspaceApplications {

    @bindable
    private content: HTMLElement;

    @bindable
    private panelActive: boolean;

    @bindable
    private tabHolder: HTMLElement;

    @bindable
    private createModal: HTMLElement;

    attached() : void {

        if (this.panelActive) {
            $(this.content).removeClass('body-content-full')
        } else {
            $(this.content).addClass('body-content-full')
        }

        $(this.tabHolder).tabs();
        $(this.createModal).modal();
    }

}