export interface FolioMenuItem {

    name:string;

}

export class AbstractMenuItem implements FolioMenuItem {

    constructor(public name:string) {

    }

}