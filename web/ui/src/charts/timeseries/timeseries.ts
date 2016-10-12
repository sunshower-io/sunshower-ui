//noinspection TypeScriptCheckImport
import * as Plotly from "plot.ly";

import {autoinject, bindable} from "aurelia-framework";
import {
    Observer, Monitor, RandomDataMonitor, MetricConfiguration, Metric,
    Color
} from "../../service/metrics/MetricService";
import {Hash} from "../../utils/Hash";
import {TaskQueue} from "aurelia-framework"


@autoinject()
export class Timeseries implements Observer<[number, number]> {
    id:string;
   
    @bindable()
    private visible:boolean;

    private chart:Element;
    private active:boolean;

    private data:Array<any>;
    private namedData:Map<string, Object>;
    
    private monitors:Array<Monitor<[number, number]>>;

    
    
    constructor(
        private element:Element,
        private taskQueue:TaskQueue
    ) {
        this.id = Hash.createId();
        this.data = [];
        this.namedData = new Map<string, Object>();
    }

    bind():void {

    }



    notify(id:string, value:[number, number]):void {
        
        let data = this.namedData[id],
            [xs, ys] = value;
        data.x.push(xs);
        data.y.push(ys);
        Plotly.redraw(
            this.chart,
            this.data
        );
        
    }
    
    stop(monitor:Monitor<[number, number]>):void {
        this.active = false;
    }

    start(monitor:Monitor<[number, number]>):void {

    }


    attach():void {
        this.visible = true;
        this.chart = $(this.element).children('.chart-contents')[0];
        $(window).resize(e => this.redraw());
        this.startMonitors();
        this.taskQueue.queueTask(() => {
            this.redraw();
        });
    }
    
    
    
    
    activate(model) {
        if(model.visible) {
            this.registerMonitors(model.monitors);
            this.attach();
        } else {
            this.visible = false;
            this.stopMonitors();
        }
    }
    
    stopMonitors() : void {
        if(this.monitors) {
            for(var monitor of this.monitors) {
                monitor.stop();
            }
        }
    }
    
    startMonitors() : void {
        if(this.monitors) {
            for(var monitor of this.monitors) {
                monitor.start();
            }
        }
    }
    
    private registerMonitors(monitors:Array<Monitor<[number, number]>>) : void {
        this.data = [];
        this.namedData = new Map<string, Object>();
        this.monitors = [];
        for(var monitor of monitors) {
            let data = {
                x:[],
                y:[],
                type: 'scatter'
            };
            this.data.push(data);
            this.namedData[monitor.metric.id] = data;
            this.monitors.push(monitor);
            monitor.register(this);
        }
    }

    attached():void {
        // this.attach();
    }

    redraw():void {
        let data = this.data;
        Plotly.newPlot(
            this.chart,
            data,
            {
                paper_bgcolor: 'rgba(0, 0, 0, 0)',
                plot_bgcolor: 'rgba(0, 0, 0, 0)',
                showlegend:false,
                margin: {
                    l: 0,
                    r: 0,
                    b: 0,
                    t: 0,
                    pad: 0
                }
            }, {
                displayModeBar: false
            });


    }
}