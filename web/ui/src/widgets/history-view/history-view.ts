import {
    bindable,
    customElement,
    autoinject
} from "aurelia-framework";

import * as $ from 'jquery';
import {DataTable} from "../../../custom_typings/datatables";
import {HistoryService, Revisable, Revision} from "../../service/history/HistoryService";


@autoinject()
@customElement('history-view')
export class HistoryView {

    @bindable()
    private style:Object;

    
    private table:DataTable;
    private historyTable:Element;
    private blockContentView:Element;
    


    constructor(
        private element:Element,
        private historyService:HistoryService
    ) {
        this.historyService = historyService;
    }


    public attached():void {
        this.reload();
        $(document).mouseup(() => {
            $(this.blockContentView).hide();
        });
    }
    
    public reload() : void {
        let data = this.getHistory(),
            table = this.table = $(this.historyTable).DataTable({
                data: data,
                columns: [
                    {"title": "Revision"},
                    {"title": "Date"},
                    {"title": "Author"},
                    {"title": "Message"},
                    {"title": "Open"}
                ],
                columnDefs: this.createColumnDefs(),
                "dom": '<"search-filter"f>tip',
                oLanguage: {
                    oPaginate: {
                        sNext: '',
                        sPrevious: ''
                    },
                    sSearch: '',
                },
                destroy: true
            });
        this.attachViewBlockListener(table, $(this.historyTable));
        this.attachOpenRevisionListener(table, $(this.historyTable));
    }

    private attachViewBlockListener(table:any, tableContainer:JQuery) {
        tableContainer.find('button.show-block').click((e) => {
            e.preventDefault();
            e.stopPropagation();
            let target = e.target,
                parent = $(e.target).parents('tr');
            let data = table.row(parent).data();
            if (data) {
                this.openBlockView(data[0], target);
            }
        });
    }
    
    openBlockView(blockid:string, target:Element):void {
        let parent = $(target).parent(),
            revision = this.historyService.getRevision(blockid),
            bcv = $(this.blockContentView),
            blocks = revision.getRevisedObjects(),
            list = $('<ul/>');

        bcv.empty();
        for(var revisedObject of blocks) {
            let span = $('<span class="ion-android-open open-block-file"/>'),
                element = $(`<a>${revisedObject.name}</a>`),
                item = $(`<li/>`);
            $(item).click(() => {
                this.dispatchBlockOpened(revisedObject);
            });
            item.append(span);
            item.append(element);
            list.append(item);
        }
        bcv.append(list);
        $(parent).css({position:'relative'});
        bcv.css({position:'absolute'});
        parent.append(bcv);
        bcv.show();
    }
    
    private dispatchRevisionOpened(revision:Revision) {

        let event:CustomEvent;
        if(window.hasOwnProperty('CustomEvent')) {
            event = new CustomEvent('revision-opened', {
                bubbles:true,
                detail: {
                    object:revision
                }
            });
        } else {
            event = document.createEvent('CustomEvent');
            event.initCustomEvent('revision-opened', true, true, {
                detail: {
                    object:revision
                }
            });
        }
        this.element.dispatchEvent(event);
        
    }
    
    private dispatchBlockOpened(revisedObject:Revisable) : void {
        let event:CustomEvent;
        if(window.hasOwnProperty('CustomEvent')) {
            event = new CustomEvent('block-opened', {
                bubbles:true,
                detail: {
                    object:revisedObject
                }
            });
        } else {
            event = document.createEvent('CustomEvent');
            event.initCustomEvent('block-opened', true, true, {
                detail: {
                    object:revisedObject
                }
            });
        }
        this.element.dispatchEvent(event);
    }
    
    
    private attachOpenRevisionListener(table:DataTable, tableContainer:JQuery) {
        tableContainer.find('button.open-revision').click((e) => {
            e.preventDefault();
            e.stopPropagation();
            let data = table.row($(e.target).parents('tr')).data();
            if (data) {
                this.dispatchRevisionOpened(data[0]);
            }
        });
    }
    
   
    private createColumnDefs() : Array<{}> {
        return [{
                "targets": -1,
                "data": null,
                "defaultContent": `
                    <div class="btn-group table-inline-editor" role="group">
                        <button class='ion-android-open btn btn-lg open-revision'></button>
                        <button class='ion-cube btn btn-lg show-block'></button>
                    </div>
                    `
            }];
    }


    private getHistory():Array<Array<String>> {
        return this.historyService.getRevisions()
            .map(revision => {
                return [revision.id,
                    revision.date.toDateString(),
                    revision.author,
                    revision.message,
                    ''
                ]
            });
    }
}