import {ObservedEvent} from "utils/observer";

type ElementEventType = "element-added"
    | "element-removed"
    | "element-modified"
    | "cycle-detected";

import {Element} from './element';

const ElementEventType = {
    ElementModified         : "element-modified" as ElementEventType,
    ElementAdded            : "element-added" as ElementEventType,
    TaskRemoved             : "element-removed" as ElementEventType,
    CycleDetected           : "cycle-detected" as ElementEventType,
};

export class ElementEvent extends ObservedEvent {

    constructor(
        public type:ElementEventType,
        public target:Element
    ) {
        super(target);
    }
}
