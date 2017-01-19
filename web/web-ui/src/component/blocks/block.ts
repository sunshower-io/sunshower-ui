import {
    BlockType,
    BlockElement
} from "component/model/block";
import * as _ from 'lodash';
export class BlockManager {

    private blockList: BlockElement[];
    private blocks: {[key: string]: BlockElement};

    constructor() {
        this.blocks = {};
        this.blockList = [];
    }

    get(id: string): BlockElement {
        return this.blocks[id];
    }

    getCategories(): Category[] {
        let categories = _.reduce(this.blockList, (result: Map<string, Category>, e: BlockElement) => {
            _.reduce(e.categories, (r: Map<string, Category>, cname: string) => {

                if (r[cname]) {
                    r[cname].count++;
                } else {
                    r[cname] = {name: cname, count: 1};
                }
                return r;

            }, result);
            return result;
        }, new Map<string, Category>());

        return _.values(categories);
    }

    add(block: BlockElement): boolean {
        if (!this.blocks[block.id]) {
            this.blocks[block.id] = block;
            this.blockList.push(block);
            return true;
        }
        return false;
    }

    getElementsOfType(type: BlockType): BlockElement[] {
        return _.filter(this.blockList, (e) => e.type === type);
    }

    listTypes(): BlockType[] {
        let results = [];
        _.reduce(this.blocks,
            (result: Map<string, BlockType>, value: BlockElement, key: string) => {
                if (!result[value.type]) {
                    result[value.type] = 1;
                    results.push(value.type);
                }
                return result;
            }, {});
        return results;
    }

    list(): BlockElement[] {
        return this.blockList;
    }
}

export interface Category {
    name?: string;
    count?: number;
}