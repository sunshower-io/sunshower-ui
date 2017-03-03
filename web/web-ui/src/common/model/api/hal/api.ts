import {Copyable} from "common/lib/lang";
import {UUID} from "common/lib/utils/uuid";
import {User} from "../../security/user";

export class Provider {

    readonly type ?: string = 'provider';



    id          ?: string;
    key         ?: string;
    name        ?: string;
    icon        ?: string;
    location    ?: string;
    account     ?: string;
    hosts       ?: number;
    vms         ?: number;
    bareMetal   ?: number;
    owner       ?: User;
    description ?: string;
    imageId     ?: string;
    awsRegion   ?: AWSRegion;




}

export class AWSRegion {

    constructor(public region     ?: string,
                public name     ?: string,
                public endpoint   ?: string
    ) {

    }


    static get() : Array<AWSRegion> {

        let array = [];
        array.push(
            new AWSRegion(
                'US East (N. Virginia) Region',
                'us-east-1',
                'https://rds.us-east-1.amazonaws.com')
        );
        array.push(
            new AWSRegion(
                'US East (Ohio) Region',
                'us-east-2',
                'https://rds.us-east-2.amazonaws.com')
        );
        array.push(
            new AWSRegion(
                'US West (N. California) Region',
                'us-west-1',
                'https://rds.us-west-1.amazonaws.com')
        );
        array.push(
            new AWSRegion(
                'US West (Oregon) Region',
                'us-west-2',
                'https://rds.us-west-2.amazonaws.com')
        );
        array.push(
            new AWSRegion(
                'Asia Pacific (Mumbai) Region',
                'ap-south-1',
                'https://rds.ap-south-1.amazonaws.com')
        );
        array.push(
            new AWSRegion(
                'Asia Pacific (Seoul) Region',
                'ap-northeast-2',
                'https://rds.ap-northeast-2.amazonaws.com')
        );
        array.push(
            new AWSRegion(
                'Asia Pacific (Singapore) Region',
                'ap-southeast-1',
                'https://rds.ap-southeast-1.amazonaws.com')
        );
        array.push(
            new AWSRegion(
                'Asia Pacific (Sydney) Region',
                'ap-southeast-2',
                'https://rds.ap-southeast-2.amazonaws.com')
        );
        array.push(
            new AWSRegion(
                'Asia Pacific (Tokyo) Region',
                'ap-northeast-1',
                'https://rds.ap-northeast-1.amazonaws.com')
        );
        array.push(
            new AWSRegion(
                'Canada (Central) Region',
                'ca-central-1',
                'https://rds.ca-central-1.amazonaws.com')
        );
        array.push(
            new AWSRegion(
                'China (Beijing) Region',
                'cn-north-1',
                'https://rds.cn-north-1.amazonaws.com.cn')
        );
        array.push(
            new AWSRegion(
                'EU (Frankfurt) Region',
                'eu-central-1',
                'https://rds.eu-central-1.amazonaws.com.cn')
        );
        array.push(
            new AWSRegion(
                'EU (Ireland) Region',
                'eu-west-1',
                'https://rds.eu-west-1.amazonaws.com.cn')
        );
        array.push(
            new AWSRegion(
                'EU (London) Region',
                'eu-west-2',
                'https://rds.eu-west-2.amazonaws.com.cn')
        );
        array.push(
            new AWSRegion(
                'South America (São Paulo) Region',
                'sa-east-1',
                'https://rds.sa-east-1.amazonaws.com')
        );
        array.push(
            new AWSRegion(
                'AWS GovCloud (US)',
                'us-gov-west-1',
                'https://rds.us-gov-west-1.amazonaws.com')
        );

        return array;

    }
}


export class OperatingSystem implements Copyable<OperatingSystem> {

    public readonly id: UUID;

    constructor(public name     ?: string,
                public icon     ?: string,
                public family   ?: string,
                public version  ?: string,
                public provider ?: Provider //test fails with no provider
    ) {
        this.id = UUID.randomUUID();

    }


    copy(): OperatingSystem {
        return new OperatingSystem(
            this.name,
            this.icon,
            this.family,
            this.version
        );
    }
}
export class InstanceDescriptor {
    id              : UUID;
    key             : string;
    name            : string;
    description     : string;

}


export class NodeConfiguration implements Copyable<NodeConfiguration> {

    public instanceCount            : number;
    public memoryProfile            : MemoryProfile;
    public storageProfile           : StorageProfile;
    public computeProfile           : ComputeProfile;
    public instanceDescriptor       : InstanceDescriptor;

    constructor() {
        this.memoryProfile      =   new MemoryProfile();
        this.storageProfile     =   new StorageProfile();
        this.computeProfile     =   new ComputeProfile();
        this.instanceDescriptor =   new InstanceDescriptor();
    }

    copy(): NodeConfiguration {
        let nc = new NodeConfiguration();
        nc.memoryProfile = this.memoryProfile.copy();
        nc.storageProfile = this.storageProfile.copy();
        nc.computeProfile = this.computeProfile.copy();
        return nc;
    }

}

export class MemoryProfile implements Copyable<MemoryProfile> {
    capacity: number;

    copy(): MemoryProfile {
        let mp = new MemoryProfile();
        mp.capacity = this.capacity;
        return mp;
    }
}

export class StorageProfile implements Copyable<StorageProfile> {
    capacity: number;

    copy(): StorageProfile {
        let sp = new StorageProfile();
        sp.capacity = this.capacity;
        return sp;
    }
}

export class ComputeProfile implements Copyable<ComputeProfile> {
    cores: number;

    copy(): ComputeProfile {
        let cp = new ComputeProfile();
        cp.cores = this.cores;
        return cp;
    }
}

