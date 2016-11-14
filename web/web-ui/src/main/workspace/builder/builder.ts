/**
 * Created by dustinlish on 11/9/16.
 */
export class Builder {


    attached() {
        $('.ui.dropdown')
            .dropdown();

        $('.side.menus .ui.sidebar')
            .sidebar({
                dimPage: false,
                transition: 'overlay',
                exclusive: false,
                closable: false
            })
            .sidebar('toggle');


        // $('body').css('overflow', 'hidden');

    }

    detached() {
        // $('body').css('overflow', 'auto');
    }

    toggle(menu) {
        console.log("toggling: " + menu);
        $(`.${menu}--menu`)
            .sidebar('toggle')
        ;
    }

}