import {bindable} from "aurelia-framework";
import {CarouselViewModel} from "common/carousel/carousel-item";
export class PageHeader {

    @bindable
    carouselItems: CarouselViewModel[];

    constructor() {
    }

    attached() : void {

    }
}