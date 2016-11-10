/**
 * Created by dustinlish on 11/8/16.
 */

export class WorkspaceWizard {

    attached() {
        $('.coupled.modal')
            .modal({
                allowMultiple: false
            });

        $('.ui.accordion')
            .accordion();

        $('.tabular.menu .item')
            .tab();

        $('.ui.checkbox')
            .checkbox();
    }

    step(to) {
        $(`.${to}.modal`)
            .modal('show');
    }

    show() {
        $('.ui.first.modal')
            .modal('show');
    }

    hide() {
        $('.ui.modal')
            .modal('hideDimmer')
    }

    submit() {
        this.hide();
        location.assign('#/main/workspaces/workspace')
    }

    createApplication() {

    }

}