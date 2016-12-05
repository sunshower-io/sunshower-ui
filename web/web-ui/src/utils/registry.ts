export class Registry {
    private values : {[key:string]: any};

    static S3_IMAGES_PATH = 's3_i';

    constructor() {
        this.values = {};
        this.values[Registry.S3_IMAGES_PATH] =
            '/hasli/api/v1/storage/s3/images';
    }


    get<T>(key:string) : T {
        return this.values[key] as T;
    }
}

