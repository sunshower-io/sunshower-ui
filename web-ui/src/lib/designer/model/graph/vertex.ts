import {Layout} from './layout';
import {UUID} from "lib/common/lang/uuid";
import {Entity, Property} from "lib/designer/model/entity";

export class Vertex {
    id                  : string;
    type                : string;
    layout              : Layout;

    name                : string;

    entities            : Entity[];

    properties          : Property[];

    constructor(data ?: any) {
        console.log(data);

        Object.assign(this, data);
        this.properties = [];
        this.entities = [];

        if (data.properties) {
            let props = Object.keys(data.properties);
            for (let i = 0; i < props.length; i++) {
                let key = props[i],
                    property = new Property(props[i], data.properties[key]);
                this.properties.push(property);
            }
        }
        if (data.entities) {
            for (let i = 0; i < data.entities.length; i++) {
                let entity = new Entity(data.entities[i]);
                this.entities.push(entity);
            }
        }
        if (!this.id) {
            this.id = UUID.random();
        }

        // this.id = UUID.random();
        // let testEntity = new Entity();
        // testEntity.name = "Test Entity";
        // testEntity.id = UUID.random();
        // let testProperty = new Property();
        // testProperty.type = "text";
        // testProperty.label = "Test Property";
        // testProperty.id = UUID.random();
        // testEntity.properties = [testProperty];
        //
        // let otherProperty = new Property();
        // otherProperty.type = "text";
        // otherProperty.label = "Test Property on Vertex";
        // otherProperty.id = UUID.random();
        //
        // this.properties = [otherProperty];
        // this.entities = [testEntity];
    }
}
