import {HttpClient} from "aurelia-fetch-client";
import {inject} from "aurelia-framework";

import {ImageDescriptor} from '../../../../../model/hal/image'
import {createEvent} from "../../../../../utils/events";


@inject(HttpClient)
export class RightMenu {


    constructor(private client: HttpClient) {

    }


}