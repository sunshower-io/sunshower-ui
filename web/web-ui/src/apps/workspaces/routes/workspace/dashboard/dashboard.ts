import {HttpClient} from "aurelia-fetch-client";
import {Workspace as WorkspaceRoute} from "apps/workspaces/routes/workspace/index";
import {autoinject} from "aurelia-dependency-injection";
import {bindable} from "aurelia-framework";

/**
 * Created by dustinlish on 2/6/17.
 */

@autoinject
export class Dashboard {

    totalInstancesData;
    totalInstanceStatuses;

    constructor(public parent:WorkspaceRoute, private client:HttpClient) {
    }

    activate(id:any) : void {
        this.parent.setMenuVisible(true);
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