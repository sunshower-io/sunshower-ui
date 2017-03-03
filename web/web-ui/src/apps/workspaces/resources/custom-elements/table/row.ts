
import {Workspace} from "apps/workspaces/routes/workspace/index";
import {bindable, noView} from "aurelia-framework";
import {autoinject} from "aurelia-dependency-injection";
import {HttpClient} from "aurelia-fetch-client";

/**
 * Created by dustinlish on 3/2/17.
 */

@noView
@autoinject
export class Row {

    @bindable
    private model: any;

    @bindable
    private route: string;

    @bindable
    private id: any;

    constructor(private parent: Workspace, private client:HttpClient) {
    }

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
    }

    open() : void {
        // TODO use app service
        // this.parent.router.navigateToRoute(this.router, id)
        let id = this.model.id;

        this.client.fetch(`applications/${id.id}`)
            .then(t => t.json() as any)
            .then(t => {

                this.parent.router.navigate(`applications/${t.application.id}/application`);
            });

    }

}