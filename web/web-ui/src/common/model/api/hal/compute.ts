import {ComputeProfile, OperatingSystem} from "./api";
import {Marshaller} from "common/lib/io/marshalling/marshaller";
import {UUID} from "common/lib/utils";

export function newNodeTemplate() : ComputeNodeTemplate {
    return {
        id: UUID.randomUUID().value,
        name: "",
        image: {
            imageId: "",
            instanceType: ""
        }
    }
}

export interface ComputeNodeTemplate {

    id                  : string;
    name                : string;

    image               : ComputeImage;
    profile             ?: ComputeProfile;
    operatingSystem     ?: OperatingSystem;
}

export interface ComputeImage {
    imageId             : string;
    instanceType        : string;
}

export class ComputeNodeTemplateMarshaller implements Marshaller<ComputeNodeTemplate> {
    write(data: ComputeNodeTemplate): {} {
        return {
            id: data.id,
            name: data.name,
            image:
                new ComputeImageMarshaller()
                    .write(data.image),
            "operating-system":
                new OperatingSystemMarshaller()
                    .write(data.operatingSystem)

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