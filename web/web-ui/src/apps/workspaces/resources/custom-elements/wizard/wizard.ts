import {noView} from "aurelia-framework";
import {autoinject} from "aurelia-dependency-injection";
/**
 * Created by dustinlish on 3/3/17.
 */

@autoinject
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

}
