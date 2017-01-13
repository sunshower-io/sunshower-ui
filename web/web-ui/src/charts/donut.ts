import {Source} from 'data/source';
import * as Plotly from 'plotly/plotly.js';
import {bindable, containerless} from "aurelia-framework";

@containerless
export class DonutChart {

    private element: Element;

    @bindable
    private label:string;

    @bindable
    private source: Source<[number, number]>;

    update(n:[number,number]) : void {
        let [value, max] = n;
        let data = [{
                values: [value, max],
                labels: [this.source.value('label')],
                type: 'pie',
                hole: .8,
                marker: {
                    colors: [this.source.value('fillColor'), '#333840']
                }
            }],

            layout = {
                height: 125,
                width: 125,
                plot_bgcolor: 'rgba(0, 0, 0, 0)',
                paper_bgcolor: 'rgba(0, 0, 0, 0)',
                showlegend: false,
                legend: {
                    x: 50,
                    y: 0
                },
                margin: {
                    l: 16,
                    r: 16,
                    b: 16,
                    t: 16,
                    pad: 0
                },
                displayModeBar: false
            };

        Plotly.newPlot(this.element, data, layout);
    }

    attached(): void {
    }

    bind(bindingContext:any, overrideContext:any) {
        this.source.source.subscribe(n => this.update(n));
    }

}