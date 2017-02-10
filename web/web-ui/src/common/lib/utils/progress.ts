import {Subject} from 'rx';

type ProgressEventType = 'activate' | 'attached';



export module ProgressEvents {

    export function activate(target:any) : ProgressEvent {
        return {
            type: 'activate',
            target: target
        };
    }

    export function attached(target:any) : ProgressEvent {
        return {
            type: 'attached',
            target: target
        };
    }

}


export interface ProgressEvent {
    type: ProgressEventType;
    target: any;
}

export class ProgressMonitor {

    constructor(public subject: Subject<ProgressEvent>) {

    }


}