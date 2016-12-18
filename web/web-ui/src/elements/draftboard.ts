/**
 * Model class for draftboards
 */
import {UUID} from 'utils/uuid';
import {Element} from './elements';
import {DefaultEventDispatcher, ObservedEvent} from "../utils/observer";
export class Draftboard {

    id                      : UUID;
    name                    : string;
    description             : string;

    rootElements            : Element[];

    constructor() {
        this.id = UUID.randomUUID();
    }


    getRootElements() : Element[] {
        return this.rootElements;
    }

    addElement(element:Element) : void {
        if(!this.rootElements) {
            this.rootElements = [];
        }
        this.rootElements.push(element);
    }

}


export class DraftboardManager extends DefaultEventDispatcher {

    private currentDraftboard;
    private readonly draftboards:{[key:string]: Draftboard};

    constructor() {
        super();
        this.draftboards = {};
    }

    save() : void {
        if(this.currentDraftboard) {
            this.draftboards[this.currentDraftboard.id.value] =
                this.currentDraftboard;
            this.dispatch('draftboard-changed',
                new ObservedEvent(this.currentDraftboard))
            this.dispatch(
                'draftboard-saved',
                new ObservedEvent(this.currentDraftboard)
            );
        }
    }

    loadDraftboard(id:string) : Draftboard {
        return this.draftboards[id];
    }

    list() : Draftboard[] {
        let results = [];
        for(let key in this.draftboards) {
            results.push(this.draftboards[key]);
        }
        return results;
    }

    focusedDraftboard() : Draftboard {
        return this.currentDraftboard;
    }

    setFocusedDraftboard(draftboard:Draftboard) : void {
        this.currentDraftboard = draftboard;
        this.dispatch('draftboard-changed',
            new ObservedEvent(draftboard))
    }


}