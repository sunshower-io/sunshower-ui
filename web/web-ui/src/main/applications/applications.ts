import 'jquery';
import {RouterConfiguration} from "aurelia-router";
import {Router} from "aurelia-router";

export class Applications {

    public router: Router;

    public configureRouter(config: RouterConfiguration, router: Router) {
        config.title = 'Applications';
        config.map([
            {
                route: 'myapps',
                name: 'myapps',
                moduleId: 'main/applications/apps/my-apps',
                nav: true,
                title: 'My Applications'
            }, {
                route: ['', 'instances'],
                name: 'instances',
                moduleId: 'main/applications/instances/instances',
                nav: true,
                title: 'Instances'
            }, {
                route: 'deploy',
                name: 'deploy',
                moduleId: 'main/applications/deploy/deploy',
                nav: true,
                title: 'Deploy'
            }, {
                route: 'Explore',
                name: 'explore',
                moduleId: 'main/applications/explore/explore',
                nav: true,
                title: 'Explore'
            }, {
                route: 'library',
                name: 'library',
                moduleId: 'main/applications/library/library',
                nav: true,
                title: 'Library'

            }
        ]);

        this.router = router;
    }

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