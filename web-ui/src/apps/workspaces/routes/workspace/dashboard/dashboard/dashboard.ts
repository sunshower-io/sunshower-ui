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
        // console.log(Plotly);
        this.chart(this.chart1id, 'Servers');
        this.chart(this.chart2id, 'Storage');
        this.chart(this.chart3id, 'Networks');
        this.chart(this.chart4id, 'Regions');

    }

    chart(chartId:string, chartTitle:string) {
        let values = [];
        for (let i = 0; i < 7; i++) {
            values.push(Math.random())
        }

        let data = [{
            values: values,
            hoverinfo: 'percent',
            hole: .5,
            type: 'pie'
        }];

        //todo colorscale
        let layout = {
            annotations: [
                {
                    font: {
                        size: 12
                    },
                    showarrow: false,
                    text: chartTitle,
                    x: 0.5,
                    y: 0.5
                }
            ],
            autosize: false,
            width: 200,
            height: 200,
            margin: {
                l: 40,
                r: 40,
                b: 40,
                t: 40,
                pad: 0
            },
            showlegend: false,
            font: {
                family: 'Roboto, sans serif',
                size: 10,
                color: '#171b26'
            }
        };

        Plotly.newPlot(chartId, data, layout, {displayModeBar: false});
    }


}