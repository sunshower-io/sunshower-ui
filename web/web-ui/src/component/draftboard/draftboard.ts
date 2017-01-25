/**
 * Model class for draftboards
 */
import {UUID} from 'utils/uuid';
import {Canvas} from 'canvas/core/canvas'
import {Element, Properties} from 'canvas/element/element';
import {DefaultEventDispatcher, ObservedEvent} from "utils/observer";
import {Graph} from "algorithms/graph/graph";

export class Draftboard extends Graph<Properties> {

    id                      : UUID;
    name                    : string;
    description             : string;

    rootElements            : {[key:string]:Element};



    constructor(public readonly builder:Canvas) {
        super();
        this.id = UUID.randomUUID();
    }


    group(layer:Element) : Element {
        let roots = this.rootElements;
        for(let child of layer.children) {
            let existing = roots[child.id];
            if(existing) {
                delete roots[child.id];
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

    removeElement(element:Element) : Element {
        if(!this.rootElements) {
            return null;
        }
        let e = this.rootElements[element.id];
        if(e) {
            delete this.rootElements[element.id];
        }
        return e;
    }

    addElement(element:Element) : void {
        super.add(element);
        if(!this.rootElements) {
            this.rootElements = {};
        }
        this.rootElements[element.id] = element;
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

    remove(element: Element) : Element {
        let result = this.focusedDraftboard()
            .removeElement(element);
        this.dispatch('element-removed',
            new Event('element-removed', element));
        return result;
    }


    removeAll(roots: Element[]) : Element[] {
        let draftboard = this.focusedDraftboard(),
            results = [];
        for(let root of roots) {
            let removed = draftboard.removeElement(root);
            if(removed) {
                results.push(removed);
            }
        }
        return results;
    }
}