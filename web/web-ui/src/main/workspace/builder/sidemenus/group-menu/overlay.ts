export class Overlay {


    private ele:any;

    constructor(private graph:any, private container:any) {

    }

    public show() : void {
    }

    public hide() : void {
        this.ele.hide();
    }

    public destroy() : void {
        this.ele.remove();
    }

    private element(container: any, offsetX: number, offsetY: number) {


    }

}