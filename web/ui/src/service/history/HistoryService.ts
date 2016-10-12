import {autoinject} from "aurelia-dependency-injection";
import {Node} from "../nodes/NodeService";
import {BlockchainService, Block} from "../blockchain/BlockchainService";
export interface Revisable {
    id:string;
    name:string;
}

export interface Commitable {
    commit(message:string, nodes?:Array<Node>):void;
}

export class Revision {

    constructor(public id:string,
                public message:string,
                public committed:boolean,
                private revisedObjects:Array<Revisable>,
                public date:Date = new Date(),
                public author:String = "jhaswell"
    ) {
        

    }

    getRevisedObjects():Array<Revisable> {
        return this.revisedObjects;
    }

}

@autoinject()
export class HistoryService {


    private orderedRevisions:Array<Revision> = [];
    
    constructor(
        private revisions:Map<string, Revision> = new Map<string, Revision>(),
        private blockchainService:BlockchainService
    ){};
    
    clear() {
        this.orderedRevisions.length = 0;
        this.revisions = new Map<string, Revision>();
    }
        
    
    getRevisions():Array<Revision> {
        return this.orderedRevisions;
    }

    commit(revision:Revision, nodes?: Array<Node>):void {
        this.blockchainService.commit(new Block(revision, nodes));
        this.revisions[revision.id] = revision;
        this.orderedRevisions.push(revision);
    }

    
    getRevision(id:string) {
        return this.revisions[id];
    }

}
