import {Hash} from '../../utils/Hash';

import {Revision, HistoryService, Revisable, Commitable} from '../history/HistoryService';
import {autoinject} from "aurelia-dependency-injection";
import {Node} from "./NodeService";

export class RevisableDocument implements Revisable {
    
    constructor(
        public id:string,
        public name:string,
        public data:string
    ) {
        
    }
    
    
    
}

@autoinject
export class ConfigurationService implements Commitable {
    
    
    private documents:Map<string, RevisableDocument>;
    
    constructor(public historyService:HistoryService) {
        this.documents = new Map<string,RevisableDocument>(); 
    }
    
    commit(message:string, nodes?:Array<Node>) : void {
        let documents = this.getUncommittedDocuments();
        this.historyService.commit(new Revision(Hash.createId(), message, true, documents), nodes);
        this.documents = new Map<string, RevisableDocument>();
    }

    


    getUncommittedDocuments() : Array<RevisableDocument> {
        let result = [];
        for(var k in this.documents) {
            result.push(this.documents[k]);
        }
        return result;
    }
    
    
    save(document:RevisableDocument) : void {
        this.documents[document.name] = document;
    }
    
    
    
}