import {inject} from 'aurelia-framework';
import {BlockManager} from 'component/blocks/block';

@inject(BlockManager)
export class Blocks {

    constructor(private blockManager:BlockManager) {

    }
}