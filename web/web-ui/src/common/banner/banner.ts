import {bindable} from 'aurelia-framework';
import {Carousel} from "common/carousel/carousel";
import {CarouselViewModel} from "common/carousel/carousel-item";
export class Banner {

    private visible: boolean;

    private carousel: Carousel;

    private container:HTMLElement;

    @bindable
    private items: CarouselViewModel[];




    toggle() : void {
        console.log("TH", this.items);
        if(this.visible) {
            this.carousel.close();
        } else {
            this.carousel.open(this.items);
        }
        $(this.container).transition('toggle', 'fade down');
    }
}