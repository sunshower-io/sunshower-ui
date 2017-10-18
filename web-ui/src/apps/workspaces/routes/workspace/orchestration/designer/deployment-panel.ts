import {customElement} from "aurelia-framework";
import {UUID} from "lib/common/lang/uuid";
import * as d3 from 'd3';
@customElement('deployment-panel')
export class DeploymentPanel {

    previousMenu: JQuery;
    graph: HTMLElement;
    id: string = UUID.random();

    attached(): void {
        $('ul.tabs').tabs();
        this.configureGraph();
        $(document).click(this.clickHandler);
    }

    deactivate(): void {
        $(document).off(this.clickHandler);
    }

    private attachListeners(): void {
        $(this.graph).find('.node').click((e) => {
            e.preventDefault();
            switch (e.which) {
                case 3:
                    alert("cool");

            }
        });
    }


    clickHandler = (e: any) => {
        if (this.previousMenu) {
            this.previousMenu.remove();
        }
    };

    private configureGraph() {
        let width = 600,
            height = 300;

        let svg = d3.select(this.graph).append("svg")
            .attr("width", width)
            .attr("height", height);

        let force = d3.layout.force()
            .gravity(.05)
            .distance(100)
            .charge(-100)
            .size([width, height]);

        d3.json("ws/graph/deployment.json", (json) => {
            force
                .nodes(json.nodes)
                .links(json.links)
                .start();

            let link = svg.selectAll(".link")
                .data(json.links)
                .enter().append("line")
                .attr("class", "link")
                .style("stroke-width", function (d: any) {
                    return 1;
                })
                .style("stroke", "#6482b9")
            ;


            let node = svg.selectAll(".node")
                .data(json.nodes)
                .enter().append("g")
                .on("contextmenu", (e, i) => {
                    (d3.event as any).preventDefault();
                    this.toggleContext(e);
                })
                .call(force.drag);

            node.append("rect")
                .attr("width", "24")
                .attr("height", "24")
                .attr("rx", "6")
                .attr("ry", "6")
                .attr("style", "fill:white; stroke: #6482b9; stroke-width:1; stroke-opacity:0.9")
            ;

            node.append("text")
                .attr("dx", 12)
                .attr("dy", ".35em")
                .text(function (d: any) {
                    return d.name
                });

            force.on("tick", function () {
                link.attr("x1", function (d: any) {
                    return d.source.x + 12;
                })
                    .attr("y1", function (d: any) {
                        return d.source.y + 12;
                    })
                    .attr("x2", function (d: any) {
                        return d.target.x + 12;
                    })
                    .attr("y2", function (d: any) {
                        return d.target.y + 12;
                    });

                node.attr("transform", function (d: any) {
                    return "translate(" + d.x + "," + d.y + ")";
                });
            });
        });

        this.attachListeners();
    }

    private toggleContext(e: any) {


        if (this.previousMenu) {
            $(this.previousMenu).remove();
        }
        console.log(e);
        let menu = $(`

         <div class="card" style="padding:0">
            <div class="card-content">
              <span class="card-title" style="float:none; padding:0">${e.name}</span>
              <ul>
                <li>IP Address: ${e.ip}</li>
                <li>DNS Address: ${e.dns}</li>
              </ul>
            </div>
            <div class="card-action">
              <a href="#" style="margin-left:24px">Upgrade</a>
              <a href="#" style="margin-left:24px">Download support pack</a>
              <a href="#" style="margin-left:24px">Open Terminal</a>
              <a href="#" style="margin-left:24px">Add Worker</a>
              <a href="#" style="margin-left:24px">Add Manager</a>
            </div>
          </div>

        `);
        this.previousMenu = menu;

        $(this.graph).append(menu);
        let position = $(this.graph).position();


        menu.offset({
            top: e.y + 175,
            left: e.x + 25
        });
    }
}