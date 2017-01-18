import {bindable} from "aurelia-framework";
import {CarouselViewModel} from "common/carousel/carousel-item";
import {Banner} from "common/banner/banner";
export class PageHeader {

    @bindable
    carouselItems: CarouselViewModel[];

    private banner: Banner;

    private element: Element;

    constructor() {
    }

    attached(): void {
        let
            getDistance = () => {
                let topDist = h.offsetTop + 700;
                return topDist;
            },
            h = this.element as HTMLElement,
            stuck = false,
            stickPoint = getDistance();

        window.onscroll = (e) => {
            let distance = getDistance() - window.pageYOffset,
                offset = window.pageYOffset;
            if ((distance <= 0) && !stuck) {
                h.style.position = 'fixed';
                h.style.top = '0px';
                this.banner.close();
                stuck = true;
            } else if (stuck && (offset <= stickPoint)) {
                h.style.position = 'static';
                this.banner.open();
                stuck = false;
            }
        }

    }
}