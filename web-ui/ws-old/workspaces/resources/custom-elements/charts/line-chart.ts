/**
 * Created by dustinlish on 2/25/17.
 */

import "chart.js"
import {bindable} from "aurelia-framework";
import {containerless} from "aurelia-framework";

@containerless
export class LineChart {

    @bindable data;
    @bindable options;
    @bindable canvasElement;

    attached() {
        this.createChart();
    }

    createChart() {
        Chart.defaults.global.defaultFontColor = '#7D7C7C';
        Chart.defaults.global.defaultFontFamily = 'Open Sans';
        Chart.defaults.global.defaultFontStyle = 'light';
        Chart.defaults.global.title.fontFamily = 'Open Sans';

        new Chart(this.canvasElement, {
            type: 'line',
            data: this.data,
            options: getDefaultLineOptions()
        });
    }

}

function getDefaultLineOptions() {
    return {
        scales: {
            xAxes: [{
                display: true,
                gridLines: {
                    display: false
                }
            }],
            yAxes: [{
                scaleLabel: {
                    display: true,
                },
                stacked: false,
                gridLines: {
                    display: false
                },
                ticks: {
                    min: 0,
                    stepSize: 5
                }
            }]
        },
        hover: {
            mode: 'point',
            intersect: true
        },
        legend: {
            display: false
        },
        scaleLabel: {
            display: true
        },
        tooltips: {
            enabled: false
        }
    };
}