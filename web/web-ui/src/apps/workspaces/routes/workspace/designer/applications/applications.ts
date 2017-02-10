/**
 * Created by dustinlish on 11/9/16.
 */


import {inject} from 'aurelia-framework';

import {HttpClient} from "aurelia-fetch-client";

import {
    EventAggregator
} from 'aurelia-event-aggregator';

import * as PNotify from 'pnotify';
import 'pnotify.callbacks';

import {
    mxEvent,
    mxEventObject,
    mxGraphSelectionModel
} from "mxgraph";

import {
    AbstractGraph
} from '../abstract-graph'

import {
    EditorOperation,
    EditorContext
} from '../editor';

import {ElementEditor} from './element-editor';


import {
    Draftboard
} from '../designer';

import {
    NavigationAware
} from '../editor';

import {Registry} from 'common/lib/utils';
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
    OperationContextFactory
} from 'common/lib/widget';

import {
    Draftboard as Draft,
    DraftboardManager
} from 'apps/workspaces/services/draftboard';

import {
    Listener,
    ObservedEvent
} from 'common/lib/utils';

import {Canvas} from 'common/lib/canvas'

import {DialogService} from 'aurelia-dialog';
import {bindable} from 'aurelia-framework';
import {ToggleLeft, ToggleRight, SearchMenu} from "./menus/misc-menus";
import {ActionManager} from 'common/lib/canvas/actions';

import {
    CanvasEvent,
    CanvasEvents
} from 'common/lib/canvas';

import {Element} from 'common/lib/canvas/element';


import {ApplicationState} from 'common/lib/storage';
import ViewExecutionOrderMenuItem from "./menus/execution-order";
import {DefaultActionSet} from "../default-action-set";

@inject(
    HttpClient,
    Draftboard,
    Registry,
    DialogService,
    DraftboardManager,
    DefaultActionSet,
    ActionManager,
    EventAggregator,
    ApplicationState
)
export class Applications extends AbstractGraph implements Listener,
    NavigationAware,
    OperationContextFactory {

    @bindable
    public menus: MenuItem[];



    private infrastructureDialog: AddInfrastructureDialog;
    private elementEditor       : ElementEditor;

    private fireElementsChanged = (sender: mxGraphSelectionModel, event: mxEventObject) => {
        let cells = sender.cells;
        this.eventAggregator.publish(CanvasEvents.CELL_SELECTION_CHANGED, {
            sender: this,
            name: CanvasEvents.CELL_SELECTION_CHANGED,
            cells: cells,
            canvas: this.graph
        });
        if(cells && cells.length) {
            this.applicationState.currentElement = cells[0] as Element;
        }
    };

    private updateSelection = (e:CanvasEvent) => {
        if(e.sender !== this) {
            this.graph.clearSelection();
            this.graph.setSelectionCells(e.cells);
        }
    };



    constructor(private client                  : HttpClient,
                private parent                  : Draftboard,
                registry                        : Registry,
                private dialogService           : DialogService,
                private draftboardManager       : DraftboardManager,
                actionSet                       : DefaultActionSet,
                private actionManager           : ActionManager,
                private eventAggregator         : EventAggregator,
                private applicationState        : ApplicationState
    ) {
        super(registry);
        this.menus = [];
        this.addMenu(new FileMenu(dialogService));
        this.addMenu(new EditMenu());
        this.addMenu(new ViewMenu());
        this.addMenu(new ZoomOut());
        this.addMenu(new ZoomIn());
        this.addMenu(new ViewExecutionOrderMenuItem(dialogService));
        this.addMenu(new Maximize());
        this.addMenu(new SearchMenu());
        this.addMenu(new ToggleLeft());
        this.addMenu(new ToggleRight());



        this.draftboardManager
            .addEventListener('draftboard-saved', this);

        eventAggregator.subscribe(
            CanvasEvents.CELL_SELECTION_CHANGED,
            this.updateSelection
        );
    }

    activate(params: any) {
        if (params && params.id) {

        } else {
        }
    }

    create(): EditorContext {
        let offset = $(this.graph.container).offset();
        return {
            host: this.parent,
            graph: this.graph,
            offset: offset
        };
    }

    protected addMenu(menu: MenuItem) {
        this.menus.push(menu);
    }


    attached(): void {
        super.attached();
        this.parent.set(this);
        this.draftboardManager
            .setFocusedDraftboard(new Draft(this.graph));
    }

    openElement(element:Element) : void {
        this.elementEditor.open(this, element);
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
                top: rightOffset.top + 60,
                left: rightOffset.left - 320
            };
        } else {
            let offset = $(this.container).offset(),
                width = $(this.container).width();
            return {
                top: offset.top + 60,
                left: width - 320
            }
        }
    }

    onSave(draftboard: Draft): void {
        new PNotify({
            title: 'Success',
            text: `Saved ${draftboard.name}`,
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

    apply(event: ObservedEvent): void {
        this.onSave(event.target as Draft);
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


    protected createBuilder(): Canvas {
        let canvas = new Canvas(
            this.container,
            this.registry,
            this.actionManager
        );
        canvas.addListener(mxEvent.DOUBLE_CLICK, (canvas:Canvas, event:mxEventObject) => {
            let e = event as any;
            if(e.properties && e.properties.cell) {
                this.openElement(e.properties.cell as any as Element);
            }
        });

        canvas.addListener(mxEvent.CLICK, (canvas:Canvas, event:mxEventObject) => {
            let e = event as any;
            if(e.properties && e.properties.cell) {
                canvas.selectCellForEvent(e.properties.cell);
                this.eventAggregator.publish(CanvasEvents.CELL_SELECTION_CHANGED, {
                    sender: this,
                    name: CanvasEvents.CELL_SELECTION_CHANGED,
                    cells: [e.properties.cell],
                    canvas: this.graph
                });

            }
        });
        return canvas;
    }

}