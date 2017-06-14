import {UUID} from "lib/common/lang/uuid";

export class Entity {

    id                  : string;
    title               : string;
    properties          : Property[];

    constructor(data ?: any) {
        this.properties = [];
        if (data) {
            this.title = data.name;
            let props = data.properties,
                keys = Object.keys(props) as any;
            for (let i = 0; i < keys; i++) {
                let property = new Property(data.properties[keys[i]]);
                this.properties.push(property);
            }
        }
        this.id = UUID.random();
    }

}

export class Property {

    id                  : string;
    label               : string;
    type                : string;
    value               : string;
    isPrivate           : boolean;

    constructor(data ?: any) {
        if (data) {
            this.label = Object.keys(data)[0];
            this.value = data[this.label];
        }
        this.type = "text";
        this.isPrivate = false;
        this.id = UUID.random();
    }

}