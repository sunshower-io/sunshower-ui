import * as $ from 'jquery';
import 'qtip2/dist/jquery.qtip'
import {LayoutService} from './LayoutService';
import * as cytoscape from 'cytoscape'

import {autoinject, bindable} from 'aurelia-framework';

import 'fetch';

import 'w2ui/dist/w2ui';
import {Options} from "../info/node-info";
import {Nodes, NodeService} from "../../service/nodes/NodeService";
import {Group, GroupService} from "../../service/nodes/GroupService";
import {Hash} from "../../utils/Hash";
import {Router} from "aurelia-router";
import {EventAggregator} from "aurelia-event-aggregator";
import EdgeDefinition = Cy.EdgeDefinition;
import NodeDefinition = Cy.NodeDefinition;
import ElementDefinition = Cy.ElementDefinition;


enum State {

    Hidden,
    Rendering,
    Rendered
}


@autoinject
export class View {

    private group:Group;

    private graph:HTMLElement;

    private layoutName:string;

    private graphOptions:any;

    private cytoscapeGraph:any;


    @bindable
    groups:Array<Group>;

    @bindable
    nodeInfoOptions:Options;

    @bindable
    location:[number, number];


    static constructed:boolean = false;


    constructor(private router:Router,
                private eventAggregator:EventAggregator,
                private nodeService:NodeService,
                private groupService:GroupService,
                private layoutService:LayoutService) {
        if (!View.constructed) {
            this.construct();
            View.constructed = true;
        }
        this.groups = this.groupService.list();
    }

    private subscription:any;
    construct():void {
        let colors = ['#ffffff', '#FF00FF', '#F0F0F0', '#0F0F0F', '#FF0000', '#00FF00', '#F2F2F2', '#0000FF'],
            groups = ['windows', 'linux', 'foundary-iron', 'ios', 'android', 'HP-UX', 'solaris', 'docker'],
            sizes = [44, 16, 9, 22, 18, 100, 7, 5],
            self = this;

        for (var j = 0; j < 8; ++j) {
            let group = new Group(Hash.createId(), groups[j], [], colors[j]);
            group.leader = Nodes.createNode(0);
            this.nodeService.save(group.leader);
            this.groupService.add(group);
            for (var i = 1; i < sizes[j]; ++i) {
                let node = Nodes.createNode(i);
                group.add(node);
                this.nodeService.save(node);
            }
        }
        
    }
    active:boolean;

    bind() {
        let self = this;
        this.subscription = this.eventAggregator.subscribe('router:navigation:complete', e => {
            if(self.active) {
                self.openWithParams(e.instruction.queryParams);
            }
        });
    }

    unbind() : void {
        if(this.subscription) {
             this.subscription.dispose();
        }
    }
    
    
    setOptions(o:Object) {
        if (this.cytoscapeGraph && o) {
            this.graphOptions = o;
            this.cytoscapeGraph.layout(o);
        }
    }


    layout(layoutName:string):void {
        this.layoutName = layoutName;
        this.router.navigateToRoute('view', this.getOptions(this.group, layoutName));
        let layout = this.layoutService.getLayout(layoutName);
        this.setOptions(layout);
    }

    fitGraph():void {
        this.cytoscapeGraph.fit();
    }


    constructNodes(groups:Array<Group>):Array<NodeDefinition> {

        return groups.reduce((acc, c) => {
            acc.push(c.getLeader());
            return acc.concat(c.getNodes());
        }, []).map(n => {
            return {
                data: n,
                classes: n.classes
            }
        });
    }

    constructEdges(groups:Array<Group>):Array<EdgeDefinition> {
        
        let result = [],
            leaders = groups.map(g => g.getLeader()),
            sources = {},
            targets = {};
        for (var i in groups) {
            let g = groups[i],
                ns = g.getNodes();
            for (var n of ns) {
                result.push({data: {source: g.leader.id, target: n.id, color: g.color}});
            }
            for (var leader of leaders) {
                result.push({data: {source: g.leader.id, target: leader.id, color: g.leader.color}});
                result.push({data: {source: leader.id, target: g.leader.id, color: leader.color}});
            }
        }
        return result;
    }

    createGraph():any {
        let self = this,
            gs = this.groupService.list(),
            ns = this.constructNodes(gs),
            edges = this.constructEdges(gs);

        if (this.cytoscapeGraph) {
            this.cytoscapeGraph.destroy();
        }
        

        this.cytoscapeGraph = cytoscape({
            container: this.graph,
            layout: this.graphOptions || {
                name: 'cose',
                padding: 10
            },
            minZoom: 0.1,
            maxZoom: 10,

            style: this.style(),
            elements: {
                nodes: ns,
                edges: edges
            },
            ready: () => {
                self.setOptions(self.graphOptions);
            }
        });
        self.attachGraphHandlers(self.cytoscapeGraph);
        return this.cytoscapeGraph;
    }


    getOptions(g:Group, name:string):any {
        if (g && name) {
            return {layout: name, id: g.id}
        }
        if (g) {
            return {id: g.id};
        }
        return {layout: name};
    }


    openGroup(g:Group) {
        this.router.navigateToRoute('view', this.getOptions(g, this.layoutName))
        if (this.cytoscapeGraph) {
            this.cytoscapeGraph.destroy();
        }

        let ns = g.getNodes(),
            nodes = this.constructNodes([g]),
            leader = g.getLeader(),
            edges = ns.reduce((acc, n) => {
                acc.push({data: {source: leader.id, target: n.id, color: g.color}});
                return acc;
            }, []);


        this.cytoscapeGraph = cytoscape({
            container: this.graph,
            layout: this.graphOptions || {
                name: 'cose',
                padding: 10
            },
            minZoom: 0.1,
            maxZoom: 10,

            style: this.style(),
            elements: {
                nodes: nodes,
                edges: edges
            }
            ,
            ready: () => {
                this.setOptions(this.graphOptions);
            }
        });
        this.attachGraphHandlers(this.cytoscapeGraph);
    }


    attachGraphHandlers(graph):void {

        graph.on('mouseout', 'node', (e) => {
            this.nodeInfoOptions = new Options()
        });

        graph.on('tap', 'node', (e) => {
            let node = e.cyTarget,
                data = node.data(),
                position = $(this.graph).parent().offset(),
                offsetx = position.left,
                offsety = position.top,
                zoom = this.cytoscapeGraph.zoom();

            this.nodeInfoOptions = new Options(
                node.renderedPosition('x'),
                node.renderedPosition('y'),
                offsetx,
                offsety,
                data,
                true,
                zoom
            );

        });
        graph.fit();
    }


    activate(params) {
        this.active = true;
        this.group = this.groupService.get(params.id);
        this.graphOptions = this.layoutService
            .getLayout(this.layoutName = params.layout);
    }


    attached() {
    }
    
    


    render():void {
        if (this.group) {
            this.openGroup(this.group);
        } else {
            this.createGraph();
        }
    }


    openWithParams(params):void {
        this.group = this.groupService.get(params.id);
        this.graphOptions = this.layoutService
            .getLayout(this.layoutName = params.layout);
        this.render();
    }


    style():any {

        return cytoscape.stylesheet()
            .selector('node')
            .css({
                'shape': 'data(shape)',
                'width': '24px',
                'height': '24px',
                'background-color': 'data(color)',
                'color': '#fff',
            })
            .selector(':selected')
            .css({
                'border-width': 3,
                'border-color': '#333',
                'opacity': '0.8'

            })
            .selector('node.windows')
            .css({
                'background-image': '/dist/img/ionicons/ico/social-windows-outline.svg',
                'background-height': '40%',
                'background-width': '40%'
            })
            .selector('node.linux')
            .css({
                'background-image': '/dist/img/ionicons/ico/social-tux.svg',
                'background-height': '40%',
                'background-width': '40%'
            })
            .selector('edge')
            .css({
                'opacity': 0.666,
                'width': '1px',
                'target-arrow-shape': 'triangle',
                'line-color': 'data(color)'
                // 'source-arrow-shape': 'circle'
                // 'line-color': 'data(faveColor)',
                // 'source-arrow-color': 'data(faveColor)',
                // 'target-arrow-color': 'data(faveColor)'
            })
            .selector('edge.questionable')
            .css({
                'line-style': 'dotted',
                'target-arrow-shape': 'diamond'
            })
            .selector('.faded')
            .css({
                'opacity': 0.25,
                'text-opacity': 0
            })
    }
}
