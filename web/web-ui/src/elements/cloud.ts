import {AbstractElement} from "./elements";
import {UUID} from "utils/uuid";


export class VirtualCloud extends AbstractElement {
    icon: string;
    constructor() {
        super();
        this.id = UUID.randomUUID();
        this.icon = 'assets/sui/themes/hasli/assets/images/icons/provider/generic/cloud.svg';
        this.name = 'VPC 0';
    }

}
