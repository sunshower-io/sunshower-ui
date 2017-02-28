/**
 * Created by dustinlish on 2/21/17.
 */

import "chart.js";
import {bindable} from "aurelia-framework";

export class Activity {
    @bindable canvasElement1;

    @bindable isEmpty;

    attached() {
        this.isEmpty = false;

        let primaryColor = "rgba(56, 155, 255, .8)";
        let backgroundColor = "rgba(246, 249, 255, 0.4)";

        var lineData = {
            labels: ["Nov'16'", "Dec'16'", "Jan'17'", "Feb'17'"],
            datasets: [
                {
                    label: "Commits",
                    lineTension: 0.1,
                    fill: true,
                    borderJoinStyle: 'miter',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderWidth: 1.5,
                    borderColor: primaryColor,
                    backgroundColor: backgroundColor,
                    pointBorderColor: primaryColor,
                    pointBackgroundColor: '#ffffff',
                    pointBorderWidth: 2,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: primaryColor,
                    pointHoverBorderColor: '#fff',
                    pointHoverBorderWidth: 1,
                    data: [8, 10, 4, 5]
                }
            ]
        };

        new Chart(this.canvasElement1, {type: 'line', data: lineData, options: getDefaultLineOptions()});
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
                    labelString: 'probability'
                },
                stacked: true,
                gridLines: {
                    display: false
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
        }
    };
}

