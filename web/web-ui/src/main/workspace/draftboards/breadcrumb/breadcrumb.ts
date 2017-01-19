export class Breadcrumb {

    private element:HTMLElement;

    pad() : void {
        $(this.element).addClass('indent');
    }

    unpad() : void {
        $(this.element).removeClass('indent');
    }
}