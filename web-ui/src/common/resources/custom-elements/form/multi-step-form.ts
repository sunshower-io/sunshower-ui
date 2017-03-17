import {bindable} from "aurelia-framework";
/**
 * Created by dustinlish on 3/5/17.
 */

export class MultiStepForm {

    @bindable cancel;
    @bindable complete;
    @bindable header;
    @bindable viewModels;
    @bindable modal;

    backButtonActive = false;
    completeButtonActive = false;
    nextButtonActive = true;

    currentViewModelPath;
    currentStep = 1;
    totalSteps = 0;

    composeRef;
    model = {};


    attached() {
        $(this.modal)
            .modal({
                allowMultiple: false,
                detachable: false,
                closable: false
            });
    }

    bind() {
        if (!this.cancel) {
            throw new Error('bindable property `cancel` must be defined on MultiStepViewCustomElement');
        }
        if (!this.complete) {
            throw new Error('bindable property `complete` must be defined on MultiStepViewCustomElement');
        }
        if (!this.viewModels) {
            throw new Error('bindable property `viewModels` must be defined on MultiStepViewCustomElement');
        }

        this.totalSteps = this.viewModels.length;
        this._update();
    }

    back() {
        this.currentStep--;
        this._update();
    }

    next() {
        this.currentStep++;
        this._update();
    }

    _update() {
        console.log("Current view model: " + this.currentViewModelPath);
        this._setButtons();
        this._setViewModel();
    }

    _setViewModel() {
        this.currentViewModelPath = this.viewModels[this.currentStep - 1];
    }

    _setButtons() {
        this.backButtonActive = this.currentStep > 1;
        this.nextButtonActive = this.currentStep < this.totalSteps;
        this.completeButtonActive = this.currentStep === this.totalSteps;
    }


}