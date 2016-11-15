/**
 * Created by dustinlish on 11/9/16.
 */
export class Builder {

    private sidebar;

    attached() {
        $('.ui.dropdown')
            .dropdown();

        this.sidebar = $('.side.menus .ui.sidebar')
            .sidebar({
                dimPage: false,
                transition: 'overlay',
                exclusive: false,
                closable: false
            });
        this.sidebar
            .sidebar('toggle');


        // $('body').css('overflow', 'hidden');

    }

    detached() {
        this.sidebar
            .sidebar('hide');
        // $('body').css('overflow', 'auto');
    }

    toggle(menu) {
        console.log("toggling: " + menu);
        $(`.${menu}--menu`)
            .sidebar('toggle')
        ;
    }

}