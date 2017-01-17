import {Dashboard} from "./dashboard/dashboard";
import {CarouselViewModel} from 'common/carousel/carousel-item'
import {Activity} from "./activity/activity";
import {Deployments} from "./deployments/deployments";
import {inject, Container} from 'aurelia-framework'

@inject(Container)
export class BannerElements {
    items:CarouselViewModel[];

    constructor(container: Container) {
        this.items = [
            container.invoke(Dashboard),
            container.invoke(Activity),
            new Deployments()
        ];
    }
}