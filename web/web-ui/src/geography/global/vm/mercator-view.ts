import {Widget} from "common/carousel/widget";
import * as d3 from 'd3';
import * as d3proj from 'd3-geo-projection';
import * as Datamap from 'datamaps';


export class MercatorView {

    private element:HTMLElement;


    constructor() {

    }


    activate() : void {

    }

    attached() : void {
        let map = new Datamap({
            fills: {
                defaultFill: 'url(#horizontal-stripe)',
            },
            geographyConfig: {
                borderWidth:0,
                highlightBorderWidth:2,
                highlightFillColor:'#171b2c',
                highlightFillOpacity: '.65',
                highlightBorderColor: '#ffffff'
            },
            element:this.element
        });

    }

}