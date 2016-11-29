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

        $('.menu .grid.layout.icon')
            .popup({
                on         : 'click',
                inline     : true,
                hoverable  : true,
                position   : 'bottom center',
                delay: {
                    hide: 100
                }
            });

    }

    detached() {
        this.sidebar
            .sidebar('hide');
    }

    toggle(menu) {
        console.log("toggling: " + menu);
        $(`.${menu}--menu`)
            .sidebar('toggle')
        ;
    }

}