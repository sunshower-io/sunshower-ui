import {autoinject} from "aurelia-framework";
import {UUID} from "lib/common/lang/uuid";
import {WorkspaceService} from "apps/workspaces/lib/model/core/workspace";
import * as Plotly from "plotly/plotly.js";

@autoinject
export class WorkspaceDashboardCharts {

    //cause plotly
    private chart1id : string = UUID.random();
    private chart2id : string = UUID.random();
    private chart3id : string = UUID.random();
    private chart4id : string = UUID.random();


    constructor(private workspaceService:WorkspaceService) {

    }

    attached() {
        this.chart(this.chart1id);
        this.chart(this.chart2id);
        this.chart(this.chart3id);
        this.chart(this.chart4id);

    }

    chart(chartId:string) {
        //will probably have to do label not via plotly to get screenshot formatting

        let values = [];
        let times = Math.round(Math.random()*10) + 2;
        for (let i = 0; i < times; i++) {
            values.push(Math.random()*10)
        }
        let colors = [
            "#e51c23",
            "#9c27b0",
            "#2196F3",
            "#009688",
            "#cddc39",
            "#ff9800",
            "#F44336",
            "#673ab7",
            "#03a9f4",
            "#4CAF50",
            "#ffeb3b",
            "#ff5722",
            "#e91e63",
            "#3f51b5",
            "#00bcd4",
            "#8bc34a",
            "#ffc107"
        ];

        let data = [{
            values: values,
            marker: {
                colors: colors
            },
            hoverinfo: 'percent',
            hole: .65,
            type: 'pie',
            sort: false,
        }];

        //todo colorscale
        let layout = {
            annotations: [
                {
                    font: {
                        size: 15,
                        color: '#9e9e9e'
                    },
                    showarrow: false,
                    text: Math.ceil(values.reduce((a, b) => a + b, 0)).toString(),
                    x: 0.5,
                    y: 0.5
                }
            ],
            autosize: false,
            width: 200,
            height: 200,
            margin: {
                l: 30,
                r: 30,
                b: 30,
                t: 30,
                pad: 0
            },
            showlegend: false,
            font: {
                size: 10,
                color: '#171b26'
            }
        };

        Plotly.newPlot(chartId, data, layout, {displayModeBar: false});
    }


}