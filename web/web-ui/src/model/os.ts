import {UUID} from "utils/uuid";
export class OperatingSystem {
    public readonly id:UUID;
    constructor(public name?: string,
                public icon?: string,
                public family?: string,
                public version?: string
    ) {
        this.id = UUID.randomUUID();
    }
}

export class OperatingSystemService {

    operatingSystems: OperatingSystem[];

    constructor() {
        this.operatingSystems = [];
        this.operatingSystems.push(new OperatingSystem(
            'Windows 8',
            'Windows8-48.png',
            'windows',
            '8'
        ));
        this.operatingSystems.push(new OperatingSystem(
            'Debian',
            'Debian-48.png',
            'linux',
            '8'
        ));
        this.operatingSystems.push(new OperatingSystem(
            'Free BSD',
            'Free BSD-48.png',
            'unix',
            '8'
        ));
        this.operatingSystems.push(new OperatingSystem(
            'Red Hat',
            'Red Hat-48.png',
            'linux',
            '8'
        ));
        this.operatingSystems.push(new OperatingSystem(
            'SUSE',
            'SUSE-48.png',
            'linux',
            '8'
        ));
        this.operatingSystems.push(new OperatingSystem(
            'Symbian',
            'Symbian-48.png',
            'linux',
            '8'
        ));
        this.operatingSystems.push(new OperatingSystem(
            'Ubuntu',
            'Ubuntu-48.png',
            'linux',
            '8'
        ));
    }

    get(id:UUID) : OperatingSystem {
        return this.operatingSystems.find(f => f.id.value === id.value);
    }

    list(): OperatingSystem[] {
        return this.operatingSystems;
    }
}