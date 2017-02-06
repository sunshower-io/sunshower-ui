import {inject, bindable} from 'aurelia-framework'
import {Banner} from 'common/banner/banner';
import 'velocity';
import 'velocity-ui';
import {
    Router,
    RouteConfig,
    RouterConfiguration
} from 'aurelia-router';

export class Home {


    public router           : Router;
    private instance        : Banner;
    @bindable
    private menuExpanded    : boolean;

    public root             : boolean = false;
    public pad              : boolean = false;

    @bindable
    private menu            : HTMLElement;

    control                 : HTMLElement;
    contentSpace            : HTMLElement;

    constructor() {
    }


    attached(): void {
        // Banner.close();
        //
        // Banner.instance.carousel.subject.subscribe(
        //     null, null, () => {
        //         this.resize(true);
        //     }
        // );
        // $(this.control).hover((e) => {
        //     if (!this.menuExpanded) {
        //         $(this.menu).velocity('transition.slideRightIn', {display: 'inline-block'});
        //         this.menuExpanded = true;
        //     }
        // });
        // $(this.menu).hover((e) => {
        // }, (e) => {
        //     if (this.menuExpanded) {
        //         $(this.menu).velocity('transition.slideRightOut', {display: 'inline-block'});
        //         this.menuExpanded = false;
        //     }
        // });
        //
        // Banner.visibility.subscribe(visible => {
        //     this.resize(visible);
        // });
    }

    navigateBack() : void {
        this.router.navigateBack();
    }

    open(routeConfig: RouteConfig) {
        if(routeConfig.settings.closeBanner) {
            Banner.close();
        }
        this.router.navigate(routeConfig.href);
    }

    private resize(visible: boolean) {
        // let instance = Banner.instance,
        //     container = $(instance.container).find('.carousel-container'),
        //     offset = $(container).offset(),
        //     height = $(container).height(),
        //     content = $(this.contentSpace);
        // if(visible) {
        //     content.height(height);
        //     content.offset(offset);
        // }
        //
        // this.instance = instance;
    }

    public configureRouter(config: RouterConfiguration, router: Router) {
        config.title = 'Workspace';
        config.map([
            {
                route: ['', 'workspaces'],
                name: 'workspaces',
                moduleId: 'main/workspaces/workspaces',
                title: 'Workspaces'
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

                route: 'block/:id',
                name: 'block',
                moduleId: 'main/blocks/block',
                nav: false,
                title: 'Block'
            },
            {
                route: 'design',
                href: '#/main/workspace/draftboard',
                name: 'Design',
                nav: true,
                moduleId: 'main/workspaces/workspaces',
                settings: {
                    closeBanner: true,
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








