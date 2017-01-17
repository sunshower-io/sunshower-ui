import {inject, bindable} from 'aurelia-framework'
import {Banner} from 'common/banner/banner';
import 'velocity';
import 'velocity-ui';
import {
    Router,
    RouterConfiguration
} from 'aurelia-router';

export class Home {


    public router: Router;

    private instance: Banner;

    @bindable
    private menuExpanded;

    @bindable
    private menu: HTMLElement;

    @bindable
    private bannerVisible: boolean;


    control: HTMLElement;
    contentSpace: HTMLElement;

    constructor() {
        Banner.setVisible(true);

    }

    attached(): void {
        Banner.instance.carousel.subject.subscribe(
            null, null, () => {
                this.bannerVisible = Banner.visible;
                this.resize();
            }
        );
        $(this.control).hover((e) => {
            if(!this.menuExpanded) {
                $(this.menu).velocity('transition.slideRightIn', {display: 'inline-block'});
                this.menuExpanded = true;
            }
        });
        $(this.menu).hover((e) =>{}, (e) => {
            if(this.menuExpanded) {
                $(this.menu).velocity('transition.slideRightOut', {display: 'inline-block'});
                this.menuExpanded = false;
            }
        });

        Banner.visibility.subscribe(visible => {
            this.bannerVisible = visible;
        });
    }

    private resize() {
        if (Banner.visible) {
            let instance = Banner.instance,
                container = $(instance.container).find('.carousel-container'),
                offset = $(container).offset(),
                height = $(container).height(),
                content = $(this.contentSpace);
            content.height(height);
            content.offset(offset);
            this.instance = instance;
        }
    }

    public configureRouter(config: RouterConfiguration, router: Router) {
        config.title = 'Workspace';
        config.map([
            {
                route: ['', 'workspace'],
                name: 'workspace',
                moduleId: 'main/home/home-default',
                title: 'Workspace'
            },
            {
                route: 'blocks',
                name: 'blocks',
                moduleId: 'main/blocks/blocks',
                nav: true,
                settings: {
                    icon: 'assets/sui/themes/hasli/assets/images/icons/blocks-icon.svg'
                },
                title: 'Blocks'
            }, {

                route: 'deployment',
                name: 'Deployment',
                moduleId: 'main/deployment/deployment',
                nav: true,
                settings: {
                    icon: 'assets/sui/themes/hasli/assets/images/icons/deploy-icon.svg'
                },
                title: 'Deployment'
            }, {
                route: 'design',
                name: 'Design',
                moduleId: 'main/design/design',
                nav: true,
                settings: {
                    icon: 'assets/sui/themes/hasli/assets/images/icons/design-icon.svg'
                },
                title: 'Design'
            }, {
                route: 'provider',
                name: 'Provider',
                moduleId: 'main/provider/provider',
                nav: true,
                settings: {
                    icon: 'assets/sui/themes/hasli/assets/images/icons/providers-icon.svg'
                },
                title: 'Provider'
            }]);
        this.router = router;
    }


}








