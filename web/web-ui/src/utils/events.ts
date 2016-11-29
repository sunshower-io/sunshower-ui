export function createEvent(id: string, detail:any) {

    var event:Event;

    if((<any>window).CustomEvent) {
        event = new CustomEvent(id, {
            detail:detail,
            bubbles:true
        });
    } else {
        event = (<any>document).createCustomEvent(id);
        (<any>event).initCustomEvent('change', true, true, {
            detail:detail
        });
    }
    return event;
}