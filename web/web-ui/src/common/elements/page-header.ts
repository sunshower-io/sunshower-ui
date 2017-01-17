import {bindable} from "aurelia-framework";
import {CarouselViewModel} from "common/carousel/carousel-item";
import {Banner} from "common/banner/banner";
export class PageHeader {

    @bindable
    carouselItems: CarouselViewModel[];

    private banner:Banner;

    private element:Element;

    constructor() {
    }

    closed:boolean = false;
    attached() : void {
        window.addEventListener('scroll', (e) => {
            let dy = window.pageYOffset || document.documentElement.scrollTop,
                triggerDistance = 20,
                banner = this.banner,
                header = this.element;
            if(!this.closed) {
                banner.toggle();
                this.closed = true;
            }


        });


    }
}