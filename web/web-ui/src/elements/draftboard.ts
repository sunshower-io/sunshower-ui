/**
 * Model class for draftboards
 */
import {UUID} from 'utils/uuid';
import {Element} from './elements';
import {Builder} from 'canvas/core/builder'
import {DefaultEventDispatcher, ObservedEvent} from "../utils/observer";
export class Draftboard {

    id                      : UUID;
    name                    : string;
    description             : string;

    rootElements            : {[key:string]:Element};



    constructor(public readonly builder:Builder) {
        this.id = UUID.randomUUID();
    }


    group(layer:Element) : Element {
        let roots = this.rootElements;
        for(let child of layer.children) {
            let existing = roots[child.id.value];
            if(existing) {
                delete roots[child.id.value];
            }
        }
        this.addElement(layer);
        return layer;
    }

    getRootElements() : Element[] {
        let rootElements = [];
        for(let elementKey in this.rootElements) {
            rootElements.push(this.rootElements[elementKey]);
        }
        return rootElements;
    }

    addElement(element:Element) : void {
        if(!this.rootElements) {
            this.rootElements = {};
        }
        this.rootElements[element.id.value] = element;
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

    createLayer(layer:Element) : void {
        this.focusedDraftboard().group(layer);
        this.dispatch('draftboard-changed',
            new ObservedEvent(this.currentDraftboard))
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

    add(element:Element) : Element {
        this.focusedDraftboard()
            .addElement(element);
        this.dispatch(
            'element-added',
            new Event('element-added', element),
        );
        return element;
    }


}