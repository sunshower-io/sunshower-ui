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

    constructor() {
        this.id = UUID.random();

        this.name = "Test Title";

        let testEntity = new Entity();
        testEntity.name = "Test Entity";
        testEntity.id = UUID.random();
        let testProperty = new Property();
        testProperty.type = "text";
        testProperty.label = "Test Property";
        testProperty.id = UUID.random();
        testEntity.properties = [testProperty];

        let otherProperty = new Property();
        otherProperty.type = "text";
        otherProperty.label = "Test Property on Vertex";
        otherProperty.id = UUID.random();

        this.properties = [otherProperty];
        this.entities = [testEntity];
    }
}
