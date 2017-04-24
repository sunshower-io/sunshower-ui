import {bindable} from "aurelia-framework";
/**
 * Created by dustinlish on 3/5/17.
 */

export class ApplicationRow {
    @bindable
    private model: any;

    activate(model) {
        this.model = model;
    }

    attached() {
        $('.child.checkbox')
            .checkbox({
                // Fire on load to set parent value
                fireOnInit : true,
                // Change parent state on each child checkbox change
                onChange   : function() {
                    var
                        $tableGroup      = $(this).closest('table'),
                        $checkbox       = $tableGroup.find('.child.checkbox'),
                        allChecked      = true,
                        allUnchecked    = true
                        ;
                    // check to see if all other siblings are checked or unchecked
                    $checkbox.each(function() {
                        if( $(this).checkbox('is checked') ) {
                            allUnchecked = false;
                        }
                        else {
                            allChecked = false;
                        }
                    });
                    // set parent checkbox state, but dont trigger its onChange callback
                    if(allChecked) {
                        $('.ui.master.checkbox').checkbox('set checked');
                    }
                    else if(allUnchecked) {
                        $('.ui.master.checkbox').checkbox('set unchecked');
                    }
                    else {
                        $('.ui.master.checkbox').checkbox('set unchecked');
                    }
                }
            })
        ;

        $('.ui.dropdown')
            .dropdown({
            });
    }
}
