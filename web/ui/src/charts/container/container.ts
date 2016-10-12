import {bindable, autoinject} from "aurelia-framework";
import {Events} from '../../utils/Events';
import {Hash} from "../../utils/Hash";
import {Compose} from "aurelia-templating-resources";
import Startable = lang.Startable;
import Stoppable = lang.Stoppable;
import {MetricService} from "../../service/metrics/MetricService";

@autoinject()
export class Container {
   
    @bindable()
    label:string
   
    @bindable()
    public id:string;
    
    
    @bindable()
    private selectorVisible:boolean;
    
    @bindable() 
    private chartModel:Object = {};
    
    
    private chart:Compose;
    
    private selector:Compose;
   
    constructor(
        private element:Element,
        private metricService:MetricService
    ) {
        this.id = Hash.createId();
        this.label = "CPU Utilization"
        this.selectorVisible = true;
    }
    
    openChart(event:CustomEvent) : void {
        this.chartModel = {
            visible:true,
            monitors:event.detail.monitors
        };
        this.selectorVisible = false;
    }
    
    
    edit() : void {
        this.chartModel = {
            visible:false
        };
        this.selectorVisible = true;
    }
    
    public destroyChart() : void {
        (<Stoppable>this.chart.currentViewModel).stop();
        Events.dispatch('destroy-chart', this.element, {
            bubbles:true,
            cancelable:true,
            detail : {
                id:this.id
            }
        });
        $(this.element).closest('.graph-host').remove();
    }
    
}