export class UUID {
    public readonly value:string;
    constructor(value: string) {
        this.value = value;
    }


    static fromString(str:string) : UUID {
        return new UUID(str);
    }

    static randomUUID(): UUID {
        let d = new Date().getTime();
        if (window.performance && typeof window.performance.now === "function") {
            d += performance.now();
        }
        let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return new UUID(uuid);
    }

    toString() : string {
        return this.value;
    }

}


