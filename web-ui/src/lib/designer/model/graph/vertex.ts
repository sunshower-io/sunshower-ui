import {Layout} from './layout';
import {UUID} from "lib/common/lang/uuid";
import {Entity} from "lib/designer/model/entity";

export class Vertex {
    id                  : string;
    type                : string;
    layout              : Layout;

    entities            : Entity[];

    constructor() {
        this.id = UUID.random();
    }
}
