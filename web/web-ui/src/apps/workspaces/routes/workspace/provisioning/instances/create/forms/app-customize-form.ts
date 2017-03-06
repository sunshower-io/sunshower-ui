
export class AppCustomizeForm {

    singleInstancePolicy: HTMLElement;

    attached() {
        $('.ui.accordion')
            .accordion({
                exclusive: false
            });

        $('.ui.checkbox')
            .checkbox();

        $('.menu .item')
            .tab()
        ;
    }

}