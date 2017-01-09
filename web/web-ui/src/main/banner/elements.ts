import {Dashboard} from "./dashboard/dashboard";
import {CarouselViewModel} from 'common/carousel/carousel-item'
import {Activity} from "./activity/activity";

export class BannerElements {
    items:CarouselViewModel[];

    constructor() {
        this.items = [
            new Dashboard(),
            new Activity(),
        ];
    }
}