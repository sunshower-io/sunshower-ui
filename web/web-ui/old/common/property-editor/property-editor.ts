

import {bindable} from "aurelia-framework";

export interface PropertyAware {
    data : {[key:string]:string};
}

export class Property {
    key             :string;
    value           :string;
    index           :number;
}

export class PropertyEditor {


    @bindable
    propertyAware : PropertyAware;


    @bindable
    properties : Property[];


    count :number = 0;

    save() : void {
        console.log("SAVED");
    }

    current: HTMLDivElement;


    editValue(e: Event, property:Property) {
        let target = $(e.target),
            bgcolor = target.css('background-color');
        target.css('background-color', 'white');
        target.attr('contenteditable', 'true');
        target.focus();
        target.on('blur', () => {
            target.attr('contenteditable', 'false');
            target.css('background-color', bgcolor);
            this.propertyAware.data[property.key] = target.html();
        });
    }

    editKey(e: Event, property:Property) {
        let target = $(e.target),
            bgcolor = target.css('background-color');
        target.css('background-color', 'white');
        target.attr('contenteditable', 'true');
        target.focus();
        target.on('blur', () => {
            target.attr('contenteditable', 'false');
            target.css('background-color', bgcolor);
            delete this.propertyAware.data[property.key];
            let key = target.html();
            this.propertyAware.data[key] = property.value;
            property.key = key;
        });
    }

    addProperty() : void {
        if(this.properties) {
            this.properties.push({
                key: 'property' + this.count,
                value: '',
                index: this.count++
            });
        }
    }

    propertyAwareChanged(newValue:PropertyAware, oldValue:PropertyAware) {
        if(newValue) {
            this.count = 0;
            this.properties = [];
            let properties = newValue.data;
            for(let property in properties) {
                this.properties.push({
                    key: property,
                    value: properties[property],
                    index:this.count++,
                });
            }
        }


    }
}