/**
 * Created by dustinlish on 11/9/16.
 */




import {inject} from 'aurelia-framework';
import {HttpClient} from "aurelia-fetch-client";

import * as PNotify from 'pnotify';
import 'pnotify.callbacks';

import {
    mxGraph,
    Layer,
    mxCell,
} from "mxgraph";

import {
    AbstractGraph
} from '../abstract-graph'

import {
    EditorEvent,
    EditorOperation, EditorContext
} from '../editor';



import {
    Draftboard
} from '../draftboard';

import {
     NavigationAware
} from '../editor';

import {Builder as GBuilder} from '../graph/builder'
import {Registry} from 'utils/registry';
import {
    AddInfrastructure as AddInfrastructureDialog
} from "./components/add-infrastructure";

import FileMenu from './menus/file-menu';
import EditMenu from './menus/edit-menu';
import ViewMenu from './menus/view-menu';
import {ZoomOut, ZoomIn} from "./menus/zoom";
import {Maximize} from "./menus/maximize";

import {
    MenuItem,
    OperationContext,
    OperationContextFactory
} from 'common/elements/menu';

import {bindable} from 'aurelia-framework';
import {ToggleLeft, ToggleRight, SearchMenu} from "./menus/misc-menus";
import {DialogService} from 'aurelia-dialog';

@inject(
    HttpClient,
    Draftboard,
    Registry,
    DialogService
)
export class Applications extends AbstractGraph implements NavigationAware, OperationContextFactory {

    @bindable
    public menus:MenuItem[];


    private infrastructureDialog:AddInfrastructureDialog;
    constructor(private client: HttpClient,
                private parent: Draftboard,
                registry:Registry,
                private dialogService:DialogService
    ) {
        super(registry);
        this.menus = [];
        this.addMenu(new FileMenu(dialogService));
        this.addMenu(new EditMenu());
        this.addMenu(new ViewMenu());
        this.addMenu(new ZoomOut());
        this.addMenu(new ZoomIn());
        this.addMenu(new Maximize());
        this.addMenu(new SearchMenu());
        this.addMenu(new ToggleLeft());
        this.addMenu(new ToggleRight());

    }

    create(): EditorContext {
        let offset = $(this.graph.container).offset();
        return {
            host:this.parent,
            graph:this.graph,
            offset: offset
        };
    }

    protected addMenu(menu:MenuItem) {
        this.menus.push(menu);
    }



    attached(): void {
        super.attached();
        this.parent.set(this);
    }


    modifyGraph(event: Event) {
        let processor = (<any>event).detail as EditorOperation;
        processor.apply(this.create());
    }




    private computePosition(): JQueryCoordinates {
        if (this.rightVisible) {
            let right = $(this.rightSidebar).children(':first-child'),
                rightOffset = $(right).offset();
            return {
                top: rightOffset.top + 20,
                left: rightOffset.left - 320
            };
        } else {
            let offset = $(this.container).offset(),
                width = $(this.container).width();
            return {
                top: offset.top + 20,
                left: width - 320
            }
        }
    }


    addInfrastructure(e:Event) : void {
        this.infrastructureDialog.show();
    }

    handleCycle() {
        new PNotify({
            title: 'Error',
            text: 'Adding that edge would introduce an irreducible cycle',
            opacity: 0.90,
            type: 'error',
            addclass: 'graph-error',
            width: '300px',
            context: $(this.container),
            before_open: (f) => {
                let position = this.computePosition();
                f.get().css(position);
            }
        });
    }


    protected createBuilder(): GBuilder {
        return new GBuilder(this.container);
    }

}