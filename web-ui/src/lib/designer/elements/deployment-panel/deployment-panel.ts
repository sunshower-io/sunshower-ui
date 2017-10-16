import {autoinject, customElement} from "aurelia-framework";
import {containerless} from "aurelia-templating";
import * as d3 from 'd3';

@autoinject
@containerless
@customElement('deployment-panel')
export class DeploymentPanel {


    private data : any;

    private d3Holder : HTMLElement;

    private tree : any;
    private diagonal : any;
    private svg : any;
    private i : number;
    private duration : number;

    constructor() {}


    attached() {
        this.getData();
        this.setUp();
    }


    getData() : void {
        this.data = {
            "id": "S8WiiG4SqCpqjT9K5DEmxp",
            "levels": {
                "level": [
                    {
                        "level": 0,
                        "tasks": {
                            "task": [
                                {
                                    "order": 0,
                                    "name": "5",
                                    "taskId": "PnsiW8hQmxuCu1t7HicL9X"
                                },
                                {
                                    "order": 1,
                                    "name": "7",
                                    "taskId": "KKYFfV85mb9msz7FZYuMvd"
                                },
                                {
                                    "order": 2,
                                    "name": "3",
                                    "taskId": "T7N8Tr9TGKhVFMMvH5YT72"
                                }
                            ]
                        }
                    },
                    {
                        "level": 1,
                        "tasks": {
                            "task": [
                                {
                                    "order": 0,
                                    "name": "11",
                                    "taskId": "7dzhoReAyz2hp2Vz7FgTVN"
                                },
                                {
                                    "order": 1,
                                    "name": "8",
                                    "taskId": "4pStktPb9fLo8mTS4EtwHT"
                                }
                            ]
                        }
                    },
                    {
                        "level": 2,
                        "tasks": {
                            "task": [
                                {
                                    "order": 0,
                                    "name": "10",
                                    "taskId": "DJ7MEFW6is2PPMz8Ei8Mpi"
                                },
                                {
                                    "order": 1,
                                    "name": "2",
                                    "taskId": "V7nkQBJTFqfdUdpsuhsDH5"
                                },
                                {
                                    "order": 2,
                                    "name": "9",
                                    "taskId": "Az7gP4PQSVfP11voh3piYq"
                                }
                            ]
                        }
                    }
                ]
            }
        }
    }

    setUp() : void {
        let margin = {top: 20, right: 20, bottom: 20, left: 20},
            width = this.d3Holder.clientWidth - margin.right - margin.left,
            height = this.d3Holder.clientHeight - margin.top - margin.bottom;

        this.duration = 750;
        this.i = 0;
        this.tree = d3.layout.tree()
            .size([height, width]);

        this.diagonal = d3.svg.diagonal()
            .projection(function(d) { return [d.y, d.x]; });

        this.svg = d3.select(this.d3Holder).append("svg")
            .attr("width", width + margin.right + margin.left)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        this.data.x0 = height / 2;
        this.data.y0 = height / 2;

        this.update(this.data);
    }


    update(source : any) {

        let nodes = this.tree.nodes(source).reverse(),
            links = this.tree.links(nodes);

        // Normalize for fixed-depth.
        nodes.forEach(function(d) { d.y = d.depth * 180; });

        // Update the nodes…
        let node = this.svg.selectAll("g.node")
            .data(nodes, function(d) { return d.id || (d.id = ++this.i); });

        // Enter any new nodes at the parent's previous position.
        let nodeEnter = node.enter().append("g")
            .attr("class", "node")
            .attr("transform", function(d) { return "translate(" + source.y0 + "," + source.x0 + ")"; })
            .on("click", this.click);

        nodeEnter.append("circle")
            .attr("r", 1e-6)
            .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });

        nodeEnter.append("text")
            .attr("x", function(d) { return d.children || d._children ? -13 : 13; })
            .attr("dy", ".35em")
            .attr("text-anchor", function(d) { return d.children || d._children ? "end" : "start"; })
            .text(function(d) { return d.name; })
            .style("fill-opacity", 1e-6);

        // Transition nodes to their new position.
        var nodeUpdate = node.transition()
            .duration(this.duration)
            .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; });

        nodeUpdate.select("circle")
            .attr("r", 10)
            .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });

        nodeUpdate.select("text")
            .style("fill-opacity", 1);

        // Transition exiting nodes to the parent's new position.
        var nodeExit = node.exit().transition()
            .duration(this.duration)
            .attr("transform", function(d) { return "translate(" + source.y + "," + source.x + ")"; })
            .remove();

        nodeExit.select("circle")
            .attr("r", 1e-6);

        nodeExit.select("text")
            .style("fill-opacity", 1e-6);

        // Update the links…
        var link = this.svg.selectAll("path.link")
            .data(links, function(d) { return d.target.id; });

        // Enter any new links at the parent's previous position.
        link.enter().insert("path", "g")
            .attr("class", "link")
            .attr("d", function(d) {
                var o = {x: source.x0, y: source.y0};
                return this.diagonal({source: o, target: o});
            });

        // Transition links to their new position.
        link.transition()
            .duration(this.duration)
            .attr("d", this.diagonal);

        // Transition exiting nodes to the parent's new position.
        link.exit().transition()
            .duration(this.duration)
            .attr("d", function(d) {
                var o = {x: source.x, y: source.y};
                return this.diagonal({source: o, target: o});
            })
            .remove();

        // Stash the old positions for transition.
        nodes.forEach(function(d) {
            d.x0 = d.x;
            d.y0 = d.y;
        });
    }

    click(d : any) {
        if (d.children) {
            d._children = d.children;
            d.children = null;
        } else {
            d.children = d._children;
            d._children = null;
        }
        this.update(d);
    }

}