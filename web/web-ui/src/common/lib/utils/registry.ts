import {inject} from "aurelia-framework";
import {HttpClient} from "aurelia-fetch-client";
import {Container} from "aurelia-dependency-injection";

@inject(HttpClient, Container)
export class Registry {

    static readonly S3_IMAGES_PATH = 's3_i';

    private readonly values : Map<any, any>;


    constructor(
        public client                   : HttpClient,
        public container                : Container
    ) {

        this.values = new Map();
        this.values[Registry.S3_IMAGES_PATH] =
            '/hasli/api/v1/storage/s3/images';
    }


    get<T>(key:any) : T {
        return this.values[key] as T ||
                this.container.get(key);
    }



}

