import {autoinject, customElement} from "aurelia-framework";
import {containerless} from "aurelia-templating";
import * as d3 from 'd3';
import {Router} from "aurelia-router";

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
    loading: boolean = true;

    constructor(private router:Router) {}


    attached() {
        this.getData();
    }


    getData() : void {
        setTimeout(() => {
            this.loading = false;
            this.setUp();
        }, 3000);
    }

    setUp() : void {
        var treeData = [
            {
                "name": "Install CJE Cluster",
                "parent": "null",
                "id": "install-cje-cluster",
                "value": 10,
                "type": "black",
                "level": "red",
                "children": [
                    {
                        "name": "Deploy Bastion Host",
                        "parent": "install-cje-cluster",
                        "value": 15,
                        "type": "grey",
                        "level": "red",
                        "children": [
                            {
                                "name": "Install PIP",
                                "parent": "install-cje-cluster",
                                "value": 5,
                                "type": "steelblue",
                                "level": "orange",
                                "children": [{
                                    "name": "install CJE",
                                    "parent": "install-cje-cluster",
                                    "value": 8,
                                    "type": "steelblue",
                                    "level": "red",
                                    "children": [{
                                        "name": "Configure AWS CLI",
                                        "parent": "install-cje-cluster",
                                        "value": 8,
                                        "type": "steelblue",
                                        "level": "red",
                                        "children": [{
                                            "name": "Create Project",
                                            "parent": "install-cje-cluster",
                                            "value": 8,
                                            "type": "steelblue",
                                            "level": "red",
                                            "children": [{
                                                "name": "Apply Project",
                                                "parent": "install-cje-cluster",
                                                "value": 8,
                                                "type": "steelblue",
                                                "level": "red",
                                            }]
                                        }]
                                    }]
                                }]
                            },
                            {
                                "name": "install bind-utils",
                                "parent": "install-cje-cluster",
                                "value": 8,
                                "type": "steelblue",
                                "level": "red",
                            }
                        ]
                    }
                ]
            }
        ];

// ************** Generate the tree diagram	 *****************
        var margin = {top: 20, right: 120, bottom: 20, left: 120},
            width = 960 - margin.right - margin.left,
            height = 500 - margin.top - margin.bottom;

        var i = 0;

        var tree = d3.layout.tree()
            .size([height, width]);

        var diagonal = d3.svg.diagonal()
            .projection(function(d) { return [d.y, d.x]; });

        var svg = d3.select(this.d3Holder).append("svg")
            .attr("width", "100%")
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        let root = treeData[0];

        update(root);

        function update(source) {

            // Compute the new tree layout.
            var nodes = tree.nodes(root).reverse(),
                links = tree.links(nodes);

            // Normalize for fixed-depth.
            nodes.forEach(function(d) { d.y = d.depth * 180; });

            // Declare the nodes…
            var node = svg.selectAll("g.node")
                .data(nodes, function(d:any) { return d.id || (d.id = ++i); });

            // Enter the nodes.
            var nodeEnter = node.enter().append("g")
                .attr("class", "node")
                .attr("transform", function(d) {
                    return "translate(" + d.y + "," + d.x + ")"; });

            nodeEnter.append("circle")
                .attr("r", function(d:any) { return d.value; })
                .style("stroke", function(d:any) { return d.type; })
                .style("fill", function(d:any) { return d.level; });

            nodeEnter.append("text")
                .attr("x", function(d:any) {
                    return d.children || d._children ?
                        (d.value + 4) * -1 : d.value + 4 })
                .attr("dy", ".35em")
                .attr("text-anchor", function(d:any) {
                    return d.children || d._children ? "end" : "start"; })
                .text(function(d:any) { return d.name; })
                .style("fill-opacity", 1);

            // Declare the links…
            var link = svg.selectAll("path.link")
                .data(links, (d:any) => { return d.target.id; });

            // Enter the links.
            link.enter().insert("path", "g")
                .attr("class", "link")
                .style("stroke", function(d:any) { return d.target.level; })
                .attr("d", diagonal);

        }
        
        setTimeout(() => {
            this.router.navigate('deployments');
        }, 1000 * 60 * 10);
        
    }


}