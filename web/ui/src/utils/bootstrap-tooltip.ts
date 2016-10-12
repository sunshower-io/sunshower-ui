import * as $ from 'jquery';
import {customAttribute, inject, bindable} from 'aurelia-framework';
import delayed = webdriver.promise.delayed;

@customAttribute('bootstrap-tooltip')
@inject(Element)
export class BootstrapTooltip {

    @bindable animation: any;
    @bindable html: any;
    @bindable placement: any;
    @bindable selector: any;
    @bindable template: any;
    @bindable title: any;
    @bindable trigger: any;
    @bindable viewport: any;
    @bindable delay:any;

    element:Element;

    constructor(element) {
        this.element = element;
        this.trigger = "hover";
        this.delay = {
            show: "1000",
            hide: "100"
        };
    }

    bind() {
        $(this.element).tooltip({
            animation: this.animation,
            container: 'body',
            html: this.html,
            placement: this.placement,
            selector: this.selector,
            template: this.template,
            title: this.title,
            trigger: this.trigger,
            viewport: this.viewport,
            delay: this.delay
        });
    }

    unbind() {
        $(this.element).tooltip('destroy');
    }

}

