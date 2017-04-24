/**
 * Created by dustinlish on 3/5/17.
 */

import "chart.js"
import {bindable} from "aurelia-framework";
import {containerless} from "aurelia-framework";

@containerless
export class DoughnutChart {

    @bindable data;
    @bindable options;
    @bindable canvasElement;

    attached() {
        this.createChart();
    }

    activate(model) {
        this.data = model;
    }

    createChart() {
        Chart.defaults.global.defaultFontColor = '#7D7C7C';
        Chart.defaults.global.defaultFontFamily = 'Open Sans';
        Chart.defaults.global.defaultFontStyle = 'light';
        Chart.defaults.global.title.fontFamily = 'Open Sans';

        Chart.defaults.global.legend.display = false;

        new Chart(this.canvasElement, {
            type: 'doughnut',
            data: this.data,
            options: getDefaultOptions()
        });
    }

}

function getDefaultOptions() {
    return {
        responsive: false,
        tooltips: {
            callbacks: {
                label: function(tooltipItem, data) {
                    //get the concerned dataset
                    var dataset = data.datasets[tooltipItem.datasetIndex];
                    //calculate the total of this data set
                    var total = dataset.data.reduce(function(previousValue, currentValue, currentIndex, array) {
                        return previousValue + currentValue;
                    });
                    //get the current items value
                    var currentValue = dataset.data[tooltipItem.index];
                    //calculate the precentage based on the total and current item, also this does a rough rounding to give a whole number
                    var precentage = Math.floor(((currentValue/total) * 100)+0.5);

                    return precentage + "%";
                }
            }
        }
    };
}
