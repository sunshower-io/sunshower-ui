export class DockerRegistry {

    id              ?: string;
    url             ?: string;
    name            ?: string;
    credential      ?: DockerCredential;


    constructor(data ?: any) {
        Object.assign(this, data);
    }

}


//todo refactor
export class DockerCredential {
    username    ?: string;
    password    ?: string;
    id          ?: string;

    constructor(data ?: any) {
        Object.assign(this, data);
    }
}

export interface Icon {
    url         : string;
}

export class DockerContainer {

    id                      ?: string;
    name                    ?: string;
    slug                    ?: string;
    publisher               ?: DockerPublisher;
    created_at              ?: string;
    updated_at              ?: string;
    short_description       ?: string;
    source                  ?: string;
    popularity              ?: number;
    categories              ?: DockerCategory[];
    operating_systems       ?: DockerOS[];
    icon                    ?: Icon;
    certification_status    ?: string;


    constructor(data ?: any) {
        Object.assign(this, data);
    }
}

export class DockerPublisher {
    id   ?: string;
    name ?: string;

    constructor(data ?: any) {
        Object.assign(this, data);
    }
}

export class DockerCategory {
    name    ?: string;
    label   ?: string;

    constructor(data ?: any) {
        Object.assign(this, data);
    }
}

export class DockerOS {
    name    ?: string;
    label   ?: string;

    constructor(data ?: any) {
        Object.assign(this, data);
    }
}

export class DockerImg {
    large       ?: string;

    constructor(data ?: any) {
        Object.assign(this, data);
    }
}