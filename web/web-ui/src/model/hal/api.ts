import {UUID} from "utils/uuid";
export class OperatingSystem {

    public readonly id:UUID;

    constructor(
        public name     ?: string,
        public icon     ?: string,
        public family   ?: string,
        public version  ?: string
    ) {
        this.id = UUID.randomUUID();

    }
}


export class NodeConfiguration {

    public memoryProfile:MemoryProfile;

    public storageProfile:StorageProfile;

    public computeProfile:ComputeProfile;

    constructor() {
        this.memoryProfile = new MemoryProfile();
        this.storageProfile = new StorageProfile();
        this.computeProfile = new ComputeProfile();
    }

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

