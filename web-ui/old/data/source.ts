import {Observable, Subject} from 'rx';


export type Configuration = {[key:string]:any};

export interface Source<T> {



    source          :  Subject<T>;

    configuration   ?: Configuration;


    value(key: string, defaultValue?: any) : any;

    set(key:string, value:any) : void;


    stop()  : void;

    start() : void;


    close() : void;

}


export abstract class AbstractSource<T> implements Source<T> {

    source              :  Subject<T>;
    configuration       ?: Configuration;

    constructor() {
        this.configuration = {};
    }

    set(key:string, value:any) : void {
        this.configuration[key] = value;
    }

    value(key: string, defaultValue: any) : any {
        if(this.configuration[key]) {
            return this.configuration[key];
        }
        return defaultValue;
    }
    abstract stop()  : void;

    abstract start() : void;

    abstract close() : void;
}
