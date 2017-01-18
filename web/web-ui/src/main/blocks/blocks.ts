import * as _ from 'lodash';
import {inject, TaskQueue} from 'aurelia-framework';
import {BlockManager} from 'component/blocks/block';
import {BlockElement, BlockType} from 'component/model/block';

@inject(TaskQueue, BlockManager)
export class Blocks {

    private list:HTMLElement;
    private blocks:BlockElement[];
    private previousSelectedType: JQuery;

    constructor(
        private taskQueue   : TaskQueue,
        private blockManager: BlockManager
    ) {

    }

    attached() : void {
        this.blocks = this.blockManager.list();
        this.taskQueue.queueMicroTask(() => {
            this.resize();
        })
    }

    resize() : void {
        let height = window.innerHeight - $(this.list).offset().top - 32;
        $(this.list).height(height);
    }

    nameOf(blockType:BlockType) : string {
        return BlockType[blockType];
    }

    private filterTypes(t: BlockType, event: Event) {
        if (this.previousSelectedType) {
            $(this.previousSelectedType).removeClass('active');
        }
        let element = $(event.target);
        element.addClass('active');
        this.previousSelectedType = element;
        this.blocks = this.blockManager.getElementsOfType(t);
    }

}