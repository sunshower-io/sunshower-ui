import * as _ from 'lodash';
import {Time} from '../../utils/Time';
import Stoppable = lang.Stoppable;
import Startable = lang.Startable;
import {Hash} from "../../utils/Hash";

export class Metric {
    constructor(public id:string = Hash.createId(),
                public name:string,
                public configuration:MetricConfiguration) {
    }
}


export interface Observer<T> {

    id:string;

    notify(id:string, value:T):void;
    start(monitor:Monitor<T>);
    stop(monitor:Monitor<T>);
}


export interface Monitor<T> extends Startable, Stoppable {

    metric:Metric;

    getObservers():Array<Observer<T>>;

    register(observer:Observer<T>):void;

    unregister(id:string):Observer<T>;

    clear():void;

    next():T;

}


export class RandomDataMonitor implements Monitor<[number, number]>, Startable, Stoppable {

    private running:boolean;
    private observers:Map<string, Observer<[number, number]>>;

    constructor(public metric:Metric) {
        this.clear();
    }


    getObservers():Array<Observer<[number, number]>> {
        return <Array<Observer<[number, number]>>>_.values(this.observers);
    }

    register(observer:Observer<[number, number]>):void {
        this.observers[observer.id] = observer;
    }

    unregister(id:string):Observer<[number, number]> {
        let result = this.observers[id];
        if (result) {
            delete this.observers[id];
        }
        return result;
    }


    start():void {
        this.running = true;
        Time.until((i:number) => {
            let newVal = this.next();
            for (var k in this.observers) {
                let observer = this.observers[k];
                observer.notify(this.metric.id, newVal);
            }
        }, (i:number) => {
            return this.running;
        }, this.metric.configuration.measurmentInterval);

    }

    count = 0;

    next():[number, number] {
        let rand = Math.random(),
            x = rand > 0.5 ? -rand/2 : rand / 2;
        return [this.count++, x];
    }

    stop():void {
        console.log("STOP");
        this.running = false;
    }

    clear():void {
        this.observers = new Map<string, Observer<[number, number]>>();
    }

}

export class Color {
    constructor(public red:number,
                public green:number,
                public blue:number,
                public alpha:number) {
    };

}

export class MetricConfiguration {

    constructor(
                public color:Color,
                public interval:number,
                public measurmentInterval:number) {
    }
}


export class MetricService {
    private metrics:Map<string, Metric>;

    constructor() {
        this.metrics = new Map<string, Metric>();
        Metrics.initialize(this.metrics);
    }

    
    getMetric(id:string) : Metric {
        return this.metrics[id];
    }
    getMetrics():Array<Metric> {
        return <Array<Metric>>_.values(this.metrics);
    }
}

export class Metrics {
    static initialize(metrics:Map<string, Metric>):void {
        let 
            cpu = Metrics.create("CPU Utilization"),
            disc = Metrics.create("Disc Utilization"),
            memory = Metrics.create("Memory Utilization");
        metrics[cpu.id] = cpu;
        metrics[disc.id] = disc;
        metrics[memory.id] = memory;
    }
    
    static create(name:string) : Metric {
        let id = Hash.createId();
        return new Metric(id, name, 
            new MetricConfiguration(
                new Color(255, 255, 255, 1), 500, 500)
        )
    }
}