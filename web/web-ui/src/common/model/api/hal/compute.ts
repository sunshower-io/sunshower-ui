import {
    ComputeProfile,
    OperatingSystem,
    MemoryProfile,
    StorageProfile, AWSRegion
} from "./api";
import {Marshaller} from "common/lib/io/marshalling/marshaller";


export interface ComputeTemplate {

    id                  : string;
    name                : string;
    providerKey         : string;


    memoryProfile       : MemoryProfile;
    storageProfile      : StorageProfile;
    computeProfile      : ComputeProfile;

    operatingSystem     : OperatingSystem;

    location            ?: AWSRegion; //will need to figure out better way to do this

}

export interface ComputeImage {
    imageId             : string;
    instanceType        : string;
}

export class ComputeTemplateMarshaller implements Marshaller<ComputeTemplate> {
    write(data: ComputeTemplate): {} {
        return {
            id: data.id,
            name: data.name,
            "provider-key"      : data.providerKey,
            "memory-profile"    : data.memoryProfile,
            "compute-profile"   : data.computeProfile
        }
    }
}


export class ComputeImageMarshaller implements Marshaller<ComputeImage> {
    write(data: ComputeImage): {} {
        return {
            "image-id": data.imageId,
            "instance-type": data.instanceType
        }
    }
}

export class ComputeProfileMarshaller implements Marshaller<ComputeProfile> {
    write(data: ComputeProfile): {} {
        return undefined;
    }
}

export class OperatingSystemMarshaller implements Marshaller<OperatingSystem> {

    write(data: OperatingSystem): {} {
        return undefined;
    }

}

export class ComputeInstance {
    id          ?: string;
    logo        ?: string;
    name        ?: string;
    state       ?: string; //Running, Stopped, Stopping, Restart, Terminating, Deploying, Starting
    publicIp    ?: string;
    ports       ?: string;


    //TODO add provider
}