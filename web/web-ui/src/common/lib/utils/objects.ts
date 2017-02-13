
type kv = [string, any];


export class Kv {

    readonly values:{[key:string]: any};
    readonly sep:string;
    constructor(sep:string) {
        this.sep = sep;
        this.values = [];
    }

    pair(key:string, value:any) : Kv {
        this.values[key] = value;
        return this;
    }

    toString() : string {
        let result = "";
        for(let p in this.values) {
            result += p + '=' + this.values[p] + this.sep;
        }
        return result;
    }

    public static create(sep:string) : Kv {
        return new Kv(sep);
    }
}