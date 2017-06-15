import {UUID} from "lib/common/lang/uuid";

export class Entity {

    id                  : string;
    name                : string;
    properties          : Property[];

    constructor(data ?: any) {
        this.properties = [];
        if (data) {
            this.name = data.name;
            if (data.properties) {
                let props = Object.keys(data.properties);

                for (let i = 0; i < props.length; i++) {
                    let key = props[i],
                     property = new Property(props[i], data.properties[key]);
                    this.properties.push(property);
                }
            }
        }
    }

}

export class Property {

    id                  : string;
    label               : string;
    type                : string;
    value               : string;
    isPrivate           : boolean;

    constructor(label: string, value: string) {
        this.label = label;
        this.value = value;
        this.type = "text";
        this.isPrivate = false;
    }

}