export namespace Events {
    
    export class EventParameters {
        detail:Object;
        bubbles:boolean = true;
        cancelable:boolean = true;
    }
    
    export function dispatch(name:string, element:Element, params:EventParameters) : void {
        element.dispatchEvent(Events.create(name, params));
    }
    export function create(name:string, params: EventParameters) : CustomEvent {
        if(window.hasOwnProperty('CustomEvent')) {
            return new CustomEvent(name, {
                bubbles:params.bubbles,
                detail:params.detail
            });
        } else {
            let event = document.createEvent('CustomEvent');
            event.initCustomEvent(name, params.bubbles, params.cancelable, {
                detail:params.detail
            });
            return event;
        }
    }
    
}