import {inject} from "aurelia-framework";
import {HttpClient} from "aurelia-fetch-client";
import {BlockManager} from "component/blocks/block";
import {DraftboardManager} from "component/draftboard/draftboard";

@inject(
    HttpClient,
    BlockManager,
    DraftboardManager
)
export class Registry {

    static readonly S3_IMAGES_PATH = 's3_i';
    private readonly values : {[key:string]: any};

    constructor(
        public client                   : HttpClient,
        public blockManager             : BlockManager,
        public draftboardManager        : DraftboardManager
    ) {

        this.values = {};
        this.values[Registry.S3_IMAGES_PATH] =
            '/hasli/api/v1/storage/s3/images';
    }



    get<T>(key:string) : T {
        return this.values[key] as T;
    }
}

