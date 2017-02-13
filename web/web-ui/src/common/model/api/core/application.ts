import {User} from 'common/model/security'


export class Application {
    id:string;

    enabled:boolean;


    location:string;



    lastShutdown:Date;

    instanceStarted:Date;

    version:string;


    administrators: User[];

    constructor() {
        this.administrators = [];
    }
}