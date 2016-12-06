export class OperatingSystem {
    constructor(private name: string,
                private icon: string,
                private family: string,
                private version: string,) {
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


    list(): OperatingSystem[] {
        return this.operatingSystems;
    }
}