/**
 * Created by dustinlish on 11/8/16.
 */

export class CreateWorkspaceWizard {

    attached() {
        $('.coupled.modal')
            .modal({
                allowMultiple: false,
                detachable: false
            });

        $('.ui.accordion')
            .accordion();

        $('.tabular.menu .item')
            .tab();

        $('.ui.checkbox')
            .checkbox();
    }

    step(to) {
        $(`.create-wizard.${to}.modal`)
            .modal('show');
    }

    show() {
        $('.create-wizard.ui.first.modal')
            .modal('show');
    }

    hide() {
        $('.create-wizard.ui.modal')
            .modal('hide')
    }

    submit() {
        this.hide();
        location.assign('#/main/workspaces/workspace')
    }

    createApplication() {

    }

}