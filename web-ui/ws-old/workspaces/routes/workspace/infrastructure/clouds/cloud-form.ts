/**
 * Created by dustinlish on 3/3/17.
 */

export class CloudForm {

    modal : HTMLElement;

    attached() {
        console.log(this.modal);
        $(this.modal)
            .modal({
                allowMultiple: false,
                detachable: false,
                observeChanges: true
            });
    }

    show() {
        $('.ui.small.modal')
            .modal('show');
    }

}
