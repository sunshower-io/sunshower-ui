import {RouterConfiguration, Router} from "aurelia-router";

type Slot = 'left' | 'right' | 'top' | 'bottom';

const Slot = {
    Left        : 'left' as Slot,
    Right       : 'right' as Slot,
    Top         : 'top' as Slot,
    Bottom      : 'bottom' as Slot
};


type ElementControl = () => void;

export interface NavigationAware {
    set(elementControl:ElementControl, slot:Slot);
}

export class Builder implements NavigationAware {

    public router:Router;

    left:ElementControl;
    right: ElementControl;
    slots: {[slot:Slot]: ElementControl};

    configureRouter(config:RouterConfiguration, router:Router) {

        config.map([{
            route: ['', 'application'],
            name: 'applications',
            nav: true,
            title: 'Applications',
            moduleId: 'main/workspace/builder/applications/applications',
            settings:{
                icon: 'block layout icon'
            }
        }, {
            route: 'infrastructure',
            name: 'infrastructure',
            nav: true,
            title: 'Infrastructure',
            moduleId: 'main/workspace/builder/infrastructure/infrastructure',
            settings: {
                icon: 'server icon'
            }
        }, {

            route: 'deploy',
            name: 'deploy',
            nav: true,
            title: 'Deploy',
            moduleId: 'main/workspace/builder/deploy',
            settings: {
                icon: 'arrow right icon'
            }
        }]);
        this.router = router;
    }

    toggle(slot:Slot) {
    }


    set(elementControl: ElementControl, slot: Slot) {
        this.slots[slot] = elementControl;
    }
}