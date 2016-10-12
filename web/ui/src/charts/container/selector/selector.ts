import * as $ from 'jquery';


import 'select2'
import 'color-picker/colors';
import 'color-picker/color.all.min';
import 'color-picker/colorPicker.data';
import 'color-picker/colorPicker';
import 'color-picker/jQuery_implementation/jQueryColorPicker.min';
import {autoinject, bindable} from "aurelia-framework";
import {MetricService, Metric, Monitor, RandomDataMonitor} from "../../../service/metrics/MetricService";
import {Events} from '../../../utils/Events';
@autoinject()
export class Selector {
    
    @bindable()
    private visible:boolean;
        

    metricsSelector:Element;

    selectedMetrics:Element;
    
    
    metrics:Map<string, Metric>;


    constructor(
        private element:Element,
        private metricService:MetricService
    ) {
        this.metrics = new Map<string, Metric>();
    }

    
    activate(model) {
        if(model) {
            this.visible = true;
        } else {
            this.visible = false;
        }
    }

    attached() {

        let select = $(this.metricsSelector).select2({
            data: this.getMetrics()
        });

        select.on('select2:select', (e) => {
            this.addMetric(e.params.data.id);
        });

    }
    
    apply() : void {
        Events.dispatch('apply', this.element, {
            bubbles: true,
            cancelable:true,
            detail : {
                monitors:this.getMonitors()
            }
        });
    }
    
    private getMonitors() : Array<Monitor<[number,number]>> {
        let result = [];
        for(var metric in this.metrics) {
            let monitor = new RandomDataMonitor(this.metrics[metric]);
            result.push(monitor);
        }
        return result;
    }

    private addMetric(id:string):void {
        if(!this.metrics[id]) {
            let metric = this.metricService.getMetric(id),
                input = $(`<input class="color">`),
                colorHolder = $('<div class="color-holder">'),
                textHolder = $(`<span>${metric.name}</span>`),
                li = $('<li>');

            //noinspection TypeScriptUnresolvedFunction
            $(input).colorPicker({
                size: 1,
                _instance:true,
                renderCallback: (e, t) => {
                    $(colorHolder).css({
                        'background-color' : `#${e.HEX}`
                    });
                }

            });

            colorHolder.append(input);
            li.append(textHolder);
            li.append(colorHolder);
            $(this.selectedMetrics).append(li);
            this.metrics[id] = metric;
        }
        
    }

    private getMetrics():Array<Object> {
        return this.metricService.getMetrics().map(f => {
            return {id: f.id, text: f.name}
        });

    }

}