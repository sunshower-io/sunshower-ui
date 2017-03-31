import {Repository} from "common/model/api/revision/revisions";


export type ApplicationTemplate = Application;


export class Application {
    constructor(data?:any) {
        if(data) {
            Object.assign(this, data);
        }
    }

    id              : string;
    name            : string;


    repository      : Repository;
}