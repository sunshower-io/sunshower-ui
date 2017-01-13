import {Source} from "data/source";
import * as Plotly from 'plotly/plotly.js';
import {inject, bindable} from "aurelia-framework";
import {containerless} from "aurelia-framework";


@containerless
export class LineChart {
    private element: Element;

    private plot: Plot;


    private trace: Trace;


    @bindable
    private source: Source<[number, number]>;


    constructor() {

    }

    redraw(data: [number, number]): void {
        let trace = this.trace,
            [x, y] = data;
        trace.x.push(x);
        trace.y.push(y);
        Plotly.redraw(this.element);
    }

    attached(): void {
        this.trace = {
            x: [],
            y: [],
            mode: 'lines',
            name: this.source.value('name'),
            line: {
                color:  this.source.value('lineColor', 'red'),
                shape: 'spline'
            }
        };

        Plotly.newPlot(
            this.element,
            [this.trace],
            {
                plot_bgcolor: 'rgba(0, 0, 0, 0)',
                paper_bgcolor: 'rgba(0, 0, 0, 0)',
                showlegend: true,
                margin: {
                    l: 16,
                    r: 16,
                    b: 16,
                    t: 0,
                    pad: 0
                },
                legend: {
                    x: 0, y: 100
                }
            }, {
                displayModeBar: false
            });

        this.source.source.subscribe(data => {
            this.redraw(data)
        });

        // this.source.source.map(t => {
        //     this.redraw(t);
        // });


    }

}