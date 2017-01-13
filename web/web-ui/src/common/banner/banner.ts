import {
    bindable,
    inject,
    containerless
} from 'aurelia-framework';
import {Carousel} from "common/carousel/carousel";
import {CarouselViewModel} from "common/carousel/carousel-item";

@containerless
export class Banner {

    private static visible: boolean;

    private static instance:Banner;

    private visible: boolean;

    private carousel: Carousel;

    private container:HTMLElement;

    @bindable
    public label:string;

    @bindable
    private items: CarouselViewModel[];

    constructor() {

    }

    public static setVisible(visible: boolean) : void {
        Banner.visible = visible;
    }

    attached() {
        this.toggle();
        if(!Banner.instance) {
            Banner.instance = this;
        }
    }

    open() : void {
        this.carousel.open(this.items);
    }

    close() : void {
        this.carousel.close();
    }

    public static open() : void {
        if(Banner.instance) {
            Banner.instance.open();
        }
    }

    public static close() : void {
        if(Banner.instance) {
            Banner.instance.close();
        }
    }

    public static toggle() {
        if(Banner.instance) {
            let instance = Banner.instance;
            instance.toggle();
        }
    }


    toggle() : void {
        if(Banner.visible)  {
            if(this.visible) {
                this.close();
            } else {
                this.open();
            }
            this.visible = !this.visible;
            $(this.container).transition('toggle', 'fade down');
        }
    }
}