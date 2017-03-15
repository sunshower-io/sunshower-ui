import {OperatingSystem} from './api';
import {UUID} from "common/lib/utils/uuid";

export class OperatingSystemService {

    operatingSystems: OperatingSystem[];

    constructor() {
        this.operatingSystems = [];
        this.operatingSystems.push(new OperatingSystem(
            'Windows 8',
            'assets/sui/themes/hasli/assets/images/logos/os/Windows8-48.png',
            'windows',
            '8',
            {
                id: UUID.randomUUID().value,
                name: 'aws',
                imageId : 'ami-6e833e0e'
            }
        ));
        this.operatingSystems.push(new OperatingSystem(
            'Debian',
            'assets/sui/themes/hasli/assets/images/logos/os/Debian-48.png',
            'linux',
            '8'
        ));
        this.operatingSystems.push(new OperatingSystem(
            'Free BSD',
            'assets/sui/themes/hasli/assets/images/logos/os/Free BSD-48.png',
            'unix',
            '8'
        ));
        this.operatingSystems.push(new OperatingSystem(
            'Red Hat',
            'assets/sui/themes/hasli/assets/images/logos/os/Red Hat-48.png',
            'linux',
            '8'
        ));
        this.operatingSystems.push(new OperatingSystem(
            'SUSE',
            'assets/sui/themes/hasli/assets/images/logos/os/SUSE-48.png',
            'linux',
            '8'
        ));
        this.operatingSystems.push(new OperatingSystem(
            'Symbian',
            'assets/sui/themes/hasli/assets/images/logos/os/Symbian-48.png',
            'linux',
            '8'
        ));
        this.operatingSystems.push(new OperatingSystem(
            'Ubuntu',
            'assets/sui/themes/hasli/assets/images/logos/os/Ubuntu-48.png',
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