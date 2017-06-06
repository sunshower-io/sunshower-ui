import {UUID} from "lib/common/lang/uuid";

export class Entity {

    id                  : string;
    title               : string;
    properties          : Property[];

    constructor() {
        this.id = UUID.random();
    }

}

export class Property {

    id                  : string;
    label               : string;
    type                : string;
    value               : string;
    isPrivate           : boolean;

    constructor() {
        this.id = UUID.random();
    }

}