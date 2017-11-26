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
                //
                // for (let i = 0; i < props.length; i++) {
                //     let key = props[i],
                //      // property = new Property(props[i], data.properties[key]);
                //     // this.properties.push(property);
                // }
            }
        }
    }
}

type ContentType = 'text' | 'number' | 'boolean' | 'password';

export class Property {

    id                  : string;
    label               : string;
    type                : ContentType;
    value               : string;
    isPrivate           : boolean;

    constructor(data?:any) {
        if (data) {
            if (data.id) this.id = data.id;
            if (data.key) this.label = data.key;
            if (data.value) this.value = data.value;

            let propertyType = data["property-type"];
            if (propertyType && data["property-type"] == "io.sunshower.service.model.properties.StringProperty") this.type = 'text';
            if (propertyType && data["property-type"] == "io.sunshower.service.model.properties.IntegerProperty") this.type = 'number';
            if (propertyType && data["property-type"] == "io.sunshower.service.model.properties.BooleanProperty") this.type = 'boolean';
            if (propertyType && data["property-type"] == "io.sunshower.service.model.properties.SecretProperty") this.type = 'password';
        }
    }

}