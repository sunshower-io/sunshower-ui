export function createEvent(id: string, detail:any) {

    var event:Event;

    if((<any>window).CustomEvent) {
        event = new CustomEvent('image-dragged', {
            detail:detail,
            bubbles:true
        });
    } else {
        event = (<any>document).createCustomEvent('image-dragged');
        (<any>event).initCustomEvent('change', true, true, {
            detail:detail
        });
    }
    return event;
}