import {
    bindable,
    inject,
    containerless
} from 'aurelia-framework';
import {Carousel} from "common/carousel/carousel";
import {CarouselViewModel} from "common/carousel/carousel-item";
import {Subject} from 'rx';
@containerless
export class Banner {


    public static visible: boolean;

    public static instance:Banner;

    @bindable
    public visible: boolean;

    public carousel: Carousel;

    public container:HTMLElement;

    public static visibility: Subject<boolean> = new Subject<boolean>();

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
        this.visible = true;
        this.carousel.open(this.items);
        Banner.visibility.next(true);
    }

    close() : void {
        this.visible = false;
        this.carousel.close();
        Banner.visibility.next(false);
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
            // $(this.container).transition('toggle', 'fade down');
        }
    }
}