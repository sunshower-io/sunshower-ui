import * as $ from 'jquery';
import * as Packery from 'packery';
import * as Draggabilly from 'draggabilly';

import * as Plotly from "plotly"
import {bindable, autoinject} from 'aurelia-framework'
import {ChartService} from "../../service/charts/ChartService";

@autoinject
export class Metrics {

    pack:any;


    @bindable()
    charts:Array<Chart> = [];

    @bindable grid:Element;

    private boundCharts:Object;

    constructor(private chartService:ChartService) {
        this.boundCharts = {};
    }

    attached() {

        this.pack = new Packery(this.grid, {
            itemSelector: '.grid-item',
            percentPosition: true,
            gutter: 16
        });
    }

    openChart(event:CustomEvent):void {
        // console.log(id.detail.chartId);
        let self = this,
            cid = event.detail.chartId;

        this.charts.push(cid);

        setTimeout(() => {
            let chart = $(`#${cid}`),
                drag = new Draggabilly(chart[0]);

            self.pack.bindDraggabillyEvents(drag);
            self.pack.appended(chart);
            self.pack.layout();
        });
    }


}

//     @bindable grid:Element;
//
//     element:Element;
//    
//     charts:any = [];
//    
//     constructor(element:Element) {
//         this.element = element;
//       
//         for (var i = 0; i < 6; i++) {
//             this.charts[i] = getCpuData();
//         }
//
//         setInterval(() => { this.update() }, 5000);
//     }
//
//
//     pack:any;
//
//     attached() {
//         this.pack = new Packery(this.grid, {
//             itemSelector: '.grid-item',
//             gutter:16
//         });
//        
//         $(this.grid).find('.grid-item').each((i, gi) => {
//             let drag = new Draggabilly(gi);
//             this.pack.bindDraggabillyEvents(drag);
//         });
//         setTimeout(() => {
//             this.pack.layout();
//         });
//     }
//
//     update() {
//         for (var i = 0; i < 6; i++) {
//             this.charts[i].labels.push('-');
//             this.charts[i].datasets.push(getRandomDataInRange(0, 100));
//         }
//     }
//
// }
//
// function getRandomDataInRange(lower: number, upper: number) {
//     return Math.floor(Math.random() * upper) + lower
// }
//
// function getDataPoint() {
//     return {
//         labels: [
//             '-'
//         ],
//         datasets: [
//             {
//                 label: "user",
//                 borderColor: colors1.borderColor,
//                 backgroundColor: colors1.backgroundColor,
//                 pointBorderColor: colors1.pointBorderColor,
//                 pointBackgroundColor: colors1.pointBackgroundColor,
//                 pointBorderWidth: 1,
//                 data: [
//                     getRandomDataInRange(0, 100)
//                 ]
//             },
//             {
//                 label: "sys",
//                 borderColor: colors2.borderColor,
//                 backgroundColor: colors2.backgroundColor,
//                 pointBorderColor: colors2.pointBorderColor,
//                 pointBackgroundColor: colors2.pointBackgroundColor,
//                 pointBorderWidth: 1,
//                 data: [
//                     getRandomDataInRange(0, 100)
//                 ]
//             },
//             {
//                 label: "idle",
//                 borderColor: colors3.borderColor,
//                 backgroundColor: colors3.backgroundColor,
//                 pointBorderColor: colors3.pointBorderColor,
//                 pointBackgroundColor: colors3.pointBackgroundColor,
//                 pointBorderWidth: 1,
//                 data: [
//                     getRandomDataInRange(0, 100)
//                 ]
//             }
//         ]
//     };
// }
//
// function getCpuData() {
//     return {
//         labels: [
//             "-",
//             "-",
//             "-",
//             "-",
//             "-",
//             "-",
//             "-",
//         ],
//         datasets: [
//             {
//                 label: "user",
//                 borderColor: colors1.borderColor,
//                 backgroundColor: colors1.backgroundColor,
//                 pointBorderColor: colors1.pointBorderColor,
//                 pointBackgroundColor: colors1.pointBackgroundColor,
//                 pointBorderWidth: 1,
//                 data: [
//                     getRandomDataInRange(0, 100), 
//                     getRandomDataInRange(0, 100), 
//                     getRandomDataInRange(0, 100), 
//                     getRandomDataInRange(0, 100), 
//                     getRandomDataInRange(0, 100), 
//                     getRandomDataInRange(0, 100), 
//                     getRandomDataInRange(0, 100)
//                 ]
//             },
//             {
//                 label: "sys",
//                 borderColor: colors2.borderColor,
//                 backgroundColor: colors2.backgroundColor,
//                 pointBorderColor: colors2.pointBorderColor,
//                 pointBackgroundColor: colors2.pointBackgroundColor,
//                 pointBorderWidth: 1,
//                 data: [
//                     getRandomDataInRange(0, 100),
//                     getRandomDataInRange(0, 100),
//                     getRandomDataInRange(0, 100),
//                     getRandomDataInRange(0, 100),
//                     getRandomDataInRange(0, 100),
//                     getRandomDataInRange(0, 100),
//                     getRandomDataInRange(0, 100)
//                 ]
//             },
//             {
//                 label: "idle",
//                 borderColor: colors3.borderColor,
//                 backgroundColor: colors3.backgroundColor,
//                 pointBorderColor: colors3.pointBorderColor,
//                 pointBackgroundColor: colors3.pointBackgroundColor,
//                 pointBorderWidth: 1,
//                 data: [
//                     getRandomDataInRange(0, 100),
//                     getRandomDataInRange(0, 100),
//                     getRandomDataInRange(0, 100),
//                     getRandomDataInRange(0, 100),
//                     getRandomDataInRange(0, 100),
//                     getRandomDataInRange(0, 100),
//                     getRandomDataInRange(0, 100)
//                 ]
//             }
//         ]
//     };
// }
//
// function getMemData() {
//     return {
//         labels: ["January", "February", "March", "April", "May", "June", "July"],
//         datasets: [
//             {
//                 label: "user",
//                 borderColor: colors1.borderColor,
//                 backgroundColor: colors1.backgroundColor,
//                 pointBorderColor: colors1.pointBorderColor,
//                 pointBackgroundColor: colors1.pointBackgroundColor,
//                 pointBorderWidth: 1,
//                 data: [65, 59, 80, 81, 56, 55, 40]
//             },
//             {
//                 label: "unused",
//                 borderColor: colors2.borderColor,
//                 backgroundColor: colors2.backgroundColor,
//                 pointBorderColor: colors2.pointBorderColor,
//                 pointBackgroundColor: colors2.pointBackgroundColor,
//                 pointBorderWidth: 1,
//                 data: [28, 48, 40, 19, 86, 27, 90]
//             }
//         ]
//     };
// }
//
// var colors1 = {
//     borderColor: utils.randomColor(0.4),
//     backgroundColor: utils.randomColor(0.5),
//     pointBorderColor: utils.randomColor(0.7),
//     pointBackgroundColor: utils.randomColor(0.5),
// };
//
// var colors2 = {
//     borderColor: utils.randomColor(0.4),
//     backgroundColor: utils.randomColor(0.5),
//     pointBorderColor: utils.randomColor(0.7),
//     pointBackgroundColor: utils.randomColor(0.5),
// };
//
// var colors3 = {
//     borderColor: utils.randomColor(0.4),
//     backgroundColor: utils.randomColor(0.5),
//     pointBorderColor: utils.randomColor(0.7),
//     pointBackgroundColor: utils.randomColor(0.5),
// };
