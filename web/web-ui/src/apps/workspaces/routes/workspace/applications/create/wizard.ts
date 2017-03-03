import {containerless} from "aurelia-framework";
/**
 * Created by dustinlish on 3/1/17.
 */

@containerless
export class Wizard {

    attached() {
        $('.coupled.modal')
            .modal({
                allowMultiple: false,
                detachable: false,
                observeChanges: true
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
        location.assign('#/workspaces')
    }

    createApplication() {

    }

}
