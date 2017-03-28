

export class Variable {
    private _name  : string;
    private _value : string;
    private _type  : Type;


    constructor(name: string, value: string, type: Type) {
        this._name = name;
        this._value = value;
        this._type = type;
    }


    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get value(): string {
        return this._value;
    }

    set value(value: string) {
        this._value = value;
    }

    get type(): Type {
        return this._type;
    }

    set type(value: Type) {
        this._type = value;
    }

    public isPassword(): boolean {
        return this.type === Type.Password;
    }

    public isPort(): boolean {
        return this.type === Type.Port;
    }

    public isText(): boolean {
        return this.type === Type.Text;
    }

}

export enum Type {
    Password,
    Port,
    Text,
}