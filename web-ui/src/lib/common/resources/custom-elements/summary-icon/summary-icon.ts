import {
    bindable,
    customElement
} from 'aurelia-framework';


@customElement('summary-icon')
export class SummaryIcon {



    @bindable
    public stroke   : string;

    @bindable
    public fill     : string;

    @bindable
    public textcolor    : string;

    @bindable
    public size     : number;


    @bindable
    public text     : string;


    constructor() {
        this.size = 50;
        this.stroke = "#4b738d";
        this.textcolor = "#4b738d";
        this.fill = "none";
    }

    public scale() : number {
        return this.size / 36;
    }

    public summary() : string {
        if (this.text) {
            return this.text.split(" ")
                .splice(0, 2)
                .map(t => t.charAt(0).toUpperCase())
                .join('');
        } else {
            return '';
        }
    }


    computeWidth() {
        return this.size / Math.sqrt(2);
    }

    computeHeight() {
        return this.size / Math.sqrt(2);
    }

}