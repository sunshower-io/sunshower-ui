


export interface Listener {
    (event:ObservedEvent) : void;
}


export class ObservedEvent  {
    constructor(private target:any) {

    }
}


export interface EventDispatcher {
    addEventListener(
        type:string,
        listener:Listener,
        capture?: boolean,
        priority?:number
    ) : void ;

    removeEventListener(
        type:string,
        listener:Listener,
        useCapture?: boolean
    ) : void;

    dispatch(type:string, event:ObservedEvent);

    hasEventListener(type:string) : boolean;

    willTrigger(type:string) : boolean;

}

export class DefaultEventDispatcher implements EventDispatcher {
    private listeners : {[key:string]: Listener[]} = {};


    dispatch(type:string, event:ObservedEvent) {
        let listeners = this.listeners[type];
        if(listeners) {
            for(var listener of listeners) {
                listener(event);
            }
        }
    }


    addEventListener(type: string, listener: Listener, capture?: boolean, priority?: number): void {
        let listeners = this.listeners[type];
        if(!listeners) {
            listeners = [];
            this.listeners[type] = listeners;
        }
        listeners.push(listener);
    }

    removeEventListener(type: string, listener: Listener, useCapture?: boolean): void {
        let listeners = this.listeners[type];
        this.listeners[type] = listeners.filter(f => f != listener);
    }

    hasEventListener(type: string): boolean {
        return this.listeners[type] != null;
    }

    willTrigger(type: string): boolean {
        return this.hasEventListener(type);
    }

}

