import {User} from 'common/model/security'


export class Application {

    logo       ?: string;
    name       ?: string;
    version    ?: string;
    status     ?: string;
    instances  ?: number;
    containers ?: number;
    modified   ?: string;
    owner      ?: User;


    enabled:boolean;
    location:string;
    lastShutdown:Date;
    instanceStarted:Date;
    administrators: User[];

    // constructor() {
    //     this.administrators = [];
    // }

    constructor(logo: string, name: string, version: string, status: string, instances: number, containers: number, modified: string, user: User) {
        this.logo = logo;
        this.name = name;
        this.version = version;
        this.status = status;
        this.instances = instances;
        this.containers = containers;
        this.modified = modified;
        this.owner = user;
    }
}