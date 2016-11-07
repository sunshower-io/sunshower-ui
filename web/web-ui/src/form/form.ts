/**
 * Created by dustinlish on 11/3/16.
 */

export class Form {

    constructor() {
    }

    attached() {

    }

    show() {
        $('.ui.modal')
            .modal('show');

        $('select.dropdown')
            .dropdown();
    }
}