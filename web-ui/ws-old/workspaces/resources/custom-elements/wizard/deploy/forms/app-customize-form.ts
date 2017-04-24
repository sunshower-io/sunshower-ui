
export class AppCustomizeForm {

    attached() {
        $('.ui.accordion')
            .accordion({
                exclusive: false
            });

        $('.ui.checkbox')
            .checkbox();
    }

}