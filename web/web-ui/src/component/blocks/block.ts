import {
    BlockType,
    BlockElement
} from "component/model/block";
import * as _ from 'lodash';
import {UUID} from "utils/uuid";
export class BlockManager {

    private blockList: BlockElement[];
    private blocks: {[key: string]: BlockElement};

    constructor() {
        this.blocks = {};
        this.blockList = [];
        for(let i = 0; i < 100; i++) {
            let block = new BlockElement();
            let num = Math.random();
            if(num > 0.9) {
                block.type = BlockType.Official;
            } else {
                block.type = BlockType.Custom;
            }
            block.name = "Block" + i;

            this.add(block);
        }
    }

    get(id:string) : BlockElement {
        return this.blocks[id];
    }

    add(block:BlockElement) : boolean {
        if(!this.blocks[block.id]) {
            this.blocks[block.id] = block;
            this.blockList.push(block);
            return true;
        }
        return false;
    }

    getElementsOfType(type:BlockType) : BlockElement[] {
        return _.filter(this.blockList, (e) => e.type === type);
    }

    listTypes() : BlockType[] {
        let results = [];
        _.reduce(this.blocks,
            (result:Map<string, BlockType>, value:BlockElement, key:string) => {
            if(!result[value.type]) {
                result[value.type] = 1;
                results.push(value.type);
            }
            return result;
        }, {});
        return results;
    }

    list() : BlockElement[] {
        return this.blockList;
    }
}