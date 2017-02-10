import {DialogService} from "aurelia-dialog";
import {UUID} from "common/lib/utils/uuid";
import {EditorContext} from "common/lib/canvas";



export abstract class Action {



    public readonly id                  : string;
    private readonly properties         : {[key:string]: string};

    constructor(public readonly name: string,
                public readonly key: string,
                public readonly icon: string,
                chord?: string
    ) {
        this.id = UUID.randomUUID().value;
        this.properties = {};
    }

    getProperty(key:string) : string {
        return this.properties[key];
    }

    setProperty(key:string, value:string) : void {
        this.properties[key] = value;
    }

    public abstract apply(context:EditorContext) : void;
}


export class ActionManager {

    private readonly                actionList: Action[];
    public readonly                 actions: {[key: string]: Action};

    constructor(public dialogService: DialogService) {
        this.actions = {};
        this.actionList = [];
    }

    register(action:Action) : void {
        this.actionList.push(action);
        this.actions[action.key] = action;
    }


    getActions() : Action[] {
        return this.actionList;
    }
}

