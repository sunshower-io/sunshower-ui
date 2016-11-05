import 'jquery';

export class Applications {

    attached() {
        $('.ui.accordion')
            .accordion();

        $('.tabular.menu .tab.item')
            .tab();

        $('.plus--icon').click(function(){
            console.log("plus icon clicked");
            // $(this)
            //     .transition('fade');
            // $("img.plus--icon").toggleClass("transparent");
            // $("img.minus--icon").toggleClass("transparent");
        });



    }

}