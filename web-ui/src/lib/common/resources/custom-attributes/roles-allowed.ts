import {
    BoundViewFactory,
    ViewSlot,
    customAttribute,
    templateController,
    autoinject
} from 'aurelia-framework';
import {OverrideContext} from "aurelia-binding";
import {Principal as User} from 'lib/common/security/model'

import {View} from "aurelia-templating";


@customAttribute('roles-allowed')
@templateController
@autoinject
export class RolesAllowed {

    private value:string;
    private showing: boolean;
    private view: View;
    private queuedChanges = [];
    
    private bindingContext: any;
    private overrideContext: OverrideContext;

    constructor(
        private viewFactory:BoundViewFactory,
        private viewSlot:ViewSlot,
        private user:User
    ) {
    }

    bind(bindingContext:any, overrideContext:OverrideContext) {
        // Store parent bindingContext, so we can pass it down
        this.bindingContext = bindingContext;
        this.overrideContext = overrideContext;
        this.valueChanged(this.value);
    }

    valueChanged(newValue:string) {
        if (this.queuedChanges) {
            this.queuedChanges.push(newValue);
            return;
        }

        let maybePromise = this._runValueChanged(newValue);
        if (maybePromise instanceof Promise) {
            let queuedChanges = this.queuedChanges = [];

            let runQueuedChanges = () => {
                if (!queuedChanges.length) {
                    this.queuedChanges = undefined;
                    return;
                }

                let nextPromise = this._runValueChanged(queuedChanges.shift()) || Promise.resolve();
                nextPromise.then(runQueuedChanges);
            };

            maybePromise.then(runQueuedChanges);
        }
    }

    attached() : void {
        this._runValueChanged(this.queuedChanges.pop());
    }

    private isAllowed() : boolean {
        let allowedRoles = this.value ? this.value.split(/[\s,]+/) : [''];
        let userRoles = this.user.roles.map((r) => { return r.authority });

        return allowedRoles.filter((n) => {
            return userRoles.indexOf(n) !== -1
        }).length > 0;
    }

    _runValueChanged(newValue) {

        let canShow = this.isAllowed();
        if(!canShow) {
            return;
        }

        if (!newValue) {
            let viewOrPromise;
            if (this.view !== null && this.showing) {
                viewOrPromise = this.viewSlot.remove(this.view);
                if (viewOrPromise instanceof Promise) {
                    viewOrPromise.then(() => this.view.unbind());
                } else {
                    this.view.unbind();
                }
            }

            this.showing = false;
            return viewOrPromise;
        }

        if (!this.view) {
            this.view = this.viewFactory.create();
        }

        if (!(this.view as any).isBound) {
            this.view.bind(this.bindingContext, this.overrideContext);
        }

        if (!this.showing) {
            this.showing = true;
            return this.viewSlot.add(this.view);
        }

        return undefined;
    }

    /**
     * Unbinds the if
     */
    unbind() {
        if (this.view === null) {
            return;
        }

        this.view.unbind();

        if (!this.viewFactory.isCaching) {
            return;
        }

        if (this.showing) {
            this.showing = false;
            this.viewSlot.remove(this.view, true, true);
        }
        this.view.returnToCache();
        this.view = null;
    }
}
// export class RolesAllowed {
//
//     private show : boolean;
//     private subscription : Subscription;
//
//
//     private bindingContext: any;
//     private overrideContext: OverrideContext;
//     private value: string = '';
//     constructor(
//         private viewFactory:BoundViewFactory,
//         private viewSlot:ViewSlot,
//         private bindingEngine:BindingEngine,
//         private user:User
//     ) {
//     }
//
//     bind(bindingContext:any, overrideContext:OverrideContext) : boolean  {
//         this.updateView();
//         this.subscription = this.bindingEngine.propertyObserver(this.value, 'value')
//             .subscribe((newValue, oldValue) => this.updateView());
//         this.bindingContext = bindingContext;
//         this.overrideContext = overrideContext;
//         console.log(this);
//         return true;
//     }
//
//     unbind() : void {
//         if (this.subscription) {
//             this.subscription.dispose();
//         }
//     }
//
//     valueChanged(newValue : any, oldValue: any) : void {
//         console.log('inside valueChanged', newValue);
//         this.value = newValue;
//         this.updateView();
//     }
//
//     updateView() : void {
//         console.log('fuck it', this);
//         let isShowing = this.show;
//         let showStates = this.value.split(/[\s,]+/);
//         console.log('showStates', showStates);
//         let userRoles = this.user.roles.roles.map((r) => { return r.authority });
//         //
//         // this.show = showStates.filter((n) => {
//         //     return userRoles.indexOf(n) !== -1
//         // }).length > 0;
//
//         if (this.show && !isShowing) {
//             console.log("SHOWING");
//
//             let view = this.viewFactory.create() as any;
//
//                 console.log("FILTER =)))");
//                 view.bind(this.bindingContext, this.overrideContext);
//
//             this.viewSlot.add(view);
//
//         } else if (!this.show && isShowing) {
//             this.viewSlot.removeAll();
//         }
//     }
//
//
// }