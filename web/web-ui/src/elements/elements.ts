
import {UUID} from 'utils/uuid';


export interface Element {
    id:UUID;
}



export class AbstractElement {

    public id: UUID;
    constructor() {
        this.id = UUID.randomUUID();
    }

}



export class Application extends AbstractElement implements Element {
    constructor(public icon:string) {
        super();
    }
}