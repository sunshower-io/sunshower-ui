import {
    bindable,
    customElement
} from 'aurelia-framework';


@customElement('summary-icon')
export class Summary {



    @bindable
    public stroke   : string;

    @bindable
    public fill     : string;

    @bindable
    public textColor    : string;

    @bindable
    public size     : number;


    @bindable
    public text     : string;


    constructor() {
        this.size = 50;
        this.stroke = "#239ae8";
        this.textColor = "white";
        this.fill = "none";
    }

    public scale() : number {
        return this.size / 36;
    }

    public summary() : string {
        return this.text.split(" ")
            .map(t => t.charAt(0).toUpperCase())
            .join('');
    }


    computeWidth() {
        return this.size / Math.sqrt(2);
    }

    computeHeight() {
        return this.size / Math.sqrt(2);
    }

}