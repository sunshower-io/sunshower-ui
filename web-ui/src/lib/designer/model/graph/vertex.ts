import {Layout} from './layout';
import {UUID} from "lib/common/lang/uuid";

export class Vertex {
    id                  : string;
    type                : string;
    layout              : Layout;

    constructor() {
        this.id = UUID.random();
    }
}