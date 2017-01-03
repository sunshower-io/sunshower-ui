import {inject} from "aurelia-framework";
import {ActionManager} from "./action-service";
import {DialogService} from "aurelia-dialog";
import CreateBlockMenuItem from "canvas/menu/selection-menu/create-block";
import CreateVLANMenuItem from "canvas/menu/selection-menu/create-vlan";
import CreateSecurityGroupMenuItem from "canvas/menu/selection-menu/create-security-group";
import CreateGroupMenuItem from "canvas/menu/selection-menu/create-group";
import CreateLayerMenuItem from "canvas/menu/selection-menu/create-layer";


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
    }
}
