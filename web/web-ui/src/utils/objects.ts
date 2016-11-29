
type kv = [string, any];


export class Kv {

    readonly values:kv[];
    readonly sep:string;
    constructor(sep:string) {
        this.sep = sep;
        this.values = [];
    }

    pair(key:string, value:any) : Kv {
        this.values.push([key, value]);
        return this;
    }

    toString() : string {
        let result = "";
        for(var p of this.values) {
            result += p[0] + '=' + p[1] + this.sep;
        }
        return result;
    }

    public static create(sep:string) : Kv {
        return new Kv(sep);
    }
}