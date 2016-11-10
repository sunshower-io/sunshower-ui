export class OperatingSystem {

    constructor(
        public name?:string,
        public icon?: string,
        public description?: string) {

    }
}


export class NodeConfiguration {

    public name:string;

    public description:string;

    public memoryProfile:MemoryProfile;

    public storageProfile:StorageProfile;

    public computeProfile:ComputeProfile;

}

export class MemoryProfile {
    capacity:number;
}

export class StorageProfile {
    capacity:number;
}

export class ComputeProfile {

    cores:number;

}

