import {bindable, autoinject} from "aurelia-framework";
import * as $ from 'jquery';
import 'timeliner/js/timeliner'
import {Block, BlockchainService} from "../../service/blockchain/BlockchainService";
import {Revision} from "../../service/history/HistoryService";
import {Hash} from "../../utils/Hash";
import {RevisableDocument} from "../../service/nodes/ConfigurationService";
import {Nodes, NodeService} from "../../service/nodes/NodeService";

@autoinject()
export class Timeline {
   @bindable 
    private visible:boolean;
    
    @bindable blocks:Array<Block>
    
    constructor(
        private blockchainService:BlockchainService, 
        private nodeService:NodeService
    ) {
    }

    attached() : void {
        $.timeliner({});
        if(!this.blocks || this.blocks.length == 0) {
            for(var i = 0; i < 20; ++i) {
                let revision = new Revision(Hash.createId(), "Committing",
                    true,
                    [new RevisableDocument(
                        Hash.createId(),
                        "test.txt",
                        new Date().toString())
                    ]),
                    block = new Block(revision,
                        this.nodeService.getElements())
                this.blocks.push(block);
            }
        }

    }
}