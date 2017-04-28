import { User } from 'lib/common/security';

export class Approvals {

    approvals: User[];

    roles = 'admin';

    constructor() {
        this.approvals = [];
    }



}