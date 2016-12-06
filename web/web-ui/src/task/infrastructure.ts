import {Task} from './tasks';

import {OperatingSystem} from "model/os";


export class InfrastructureDescriptor {
    cpu                 : number;
    disk                : number;
    memory              : number;
    operatingSystem     : OperatingSystem;
}
