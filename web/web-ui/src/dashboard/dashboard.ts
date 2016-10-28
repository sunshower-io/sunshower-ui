import {inject} from "aurelia-dependency-injection";
/**
 * Created by dustinlish on 10/25/16.
 */

import {User} from '../model/core/security/index'
@inject(User)
export class Dashboard {

    constructor(private user:User) {

    }

}