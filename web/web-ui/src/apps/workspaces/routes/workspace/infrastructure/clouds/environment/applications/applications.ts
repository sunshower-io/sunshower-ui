/**
 * Created by dustinlish on 3/4/17.
 */

export class Applications {

    attached() {
        $('.ui.accordion').accordion();

        $('.tabular.menu .item')
            .tab();

        $('.ui.checkbox')
            .checkbox();

        $('.ui.accordion .title').click(function(){
            if ($(this).hasClass('active')) {
                $(this).find('.toggle--icon')
                    .attr('src', 'styles/themes/hasli/assets/images/icons/plus-circle.svg');
            } else {
                $(this).find('.toggle--icon')
                    .attr('src', 'styles/themes/hasli/assets/images/icons/minus-circle.svg');
            }
        });
    }


}