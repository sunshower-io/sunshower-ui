import {inject} from "aurelia-framework";
import {
    ActionManager
} from "common/lib/canvas/actions";


import {DialogService} from "aurelia-dialog";

import {
    CreateBlockMenuItem,
    CreateVLANMenuItem,
    CreateSecurityGroupMenuItem,
    CreateLayerMenuItem,
    CreateCloudMenuItem,
    CreateGroupMenuItem
} from './context-menu/actions'


@inject(DialogService, ActionManager)
export class DefaultActionSet {
    constructor(
        private readonly dialogService: DialogService,
        private readonly actionManager: ActionManager
    ) {
        actionManager.register(new CreateBlockMenuItem(dialogService));
        actionManager.register(new CreateVLANMenuItem(dialogService));
        actionManager.register(new CreateSecurityGroupMenuItem(dialogService));
        actionManager.register(new CreateGroupMenuItem(dialogService));
        actionManager.register(new CreateLayerMenuItem(dialogService));
        actionManager.register(new CreateCloudMenuItem(dialogService));

    }
}
