/**
 * Created by dustinlish on 2/6/17.
 */

import "chart.js";
import {autoinject} from "aurelia-framework";
import {Workspace} from "apps/workspaces/routes/workspace/index";

@autoinject
export class Dashboard {

    totalInstancesData;
    totalInstanceStatuses;

    activate(id:any) : void {
        this.totalInstancesData = this.getInstancesData();
        this.totalInstanceStatuses = this.getInstanceStatuses();
    }

    private getInstancesData() {
        let primaryColor = "rgba(56, 155, 255, .8)";
        let backgroundColor = "rgba(246, 249, 255, 0.4)";

        return {
            labels: ["", "Oct'16'", "Nov'16'", "Dec '16'", "Jan'17'", "Feb'17'"],
            datasets: [
                {
                    radius: 0,
                    label: "Commits",
                    lineTension: 0.0,
                    fill: false,
                    borderJoinStyle: 'miter',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderWidth: 2,
                    borderColor: primaryColor,
                    backgroundColor: backgroundColor,
                    data: [0, 0, 0, 0, 0, 0]
                }
            ]
        };
    }

    private getInstanceStatuses() {
        let primaryColor = "rgba(56, 155, 255, .8)";
        let backgroundColor = "rgba(246, 249, 255, 0.4)";

        return {
            labels: ["" ,"10:05", "10:10", "10:15", "10:20", "10:25", "10:30"],
            datasets: [
                {
                    radius: 0,
                    label: "Running",
                    lineTension: 0.0,
                    fill: false,
                    borderJoinStyle: 'miter',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderWidth: 2,
                    borderColor: "#36C68C",
                    backgroundColor: backgroundColor,
                    data: [0, 0, 0, 0, 0, 0, 0, 0]
                }
            ]
        };
    }
}