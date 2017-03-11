import {Hosts, Host} from "../hosts/hosts";
import {autoinject} from "aurelia-dependency-injection";
import {bindable} from "aurelia-framework";

/**
 * Created by dustinlish on 3/4/17.
 */

@autoinject
export class Applications {

    @bindable
    loading: boolean;

    @bindable
    isDeployed: Host[] = [];

    @bindable
    isNotDeployed: Host[] = [];

    constructor(private h: Hosts) {
    }

    attached() {
        $('.ui.accordion').accordion();

        $('.tabular.menu .item')
            .tab();

        $('.ui.checkbox')
            .checkbox();

        $('.ui.accordion .title').click(function(){
            if ($(this).hasClass('active')) {
                $(this).find('.toggle--icon')
                    .attr('src', 'styles/themes/hasli/assets/images/icons/plus-circle.svg');
            } else {
                $(this).find('.toggle--icon')
                    .attr('src', 'styles/themes/hasli/assets/images/icons/minus-circle.svg');
            }
        });

        this.refresh();
    }

    computeStatus(host: Host): string {
        if (host.version == '1.0.0') {
            return 'circle orange';
        }
        else if (host.state == 'running') {
            return 'circle green';
        }
        else if (host.state == 'stopped') {
            return 'circle red';
        } else {
            return 'circle blue';
        }
    }

    refresh(): void {
        this.loading = true;

        setTimeout(() => {
            var hosts = this.h.createMockHosts();

            this.isDeployed = [
                new Host("styles/themes/hasli/assets/images/logos/os/Ubuntu-48.png", `ubuntux64-1`, "2.0.0", "running", `10.238.0.51`, "22", 4, "4gb", "40gb", true),
                new Host("styles/themes/hasli/assets/images/logos/os/Ubuntu-48.png", `ubuntux64-2`, "1.0.0", "running", `10.238.0.52`, "22", 4, "4gb", "40gb", true),
            ]

            this.isNotDeployed = [
                new Host("styles/themes/hasli/assets/images/logos/os/Red Hat-48.png", `rhelx64-1`, "not installed", "running", `10.238.1.5`, "22", 4, "4gb", "40gb", true),
                new Host("styles/themes/hasli/assets/images/logos/os/Suse-48.png", `susex64-1`, "not installed", "stopped", `10.238.2.5`, "22", 4, "4gb", "40gb", true),
                new Host("styles/themes/hasli/assets/images/logos/os/Suse-48.png", `susex64-2`, "not installed", "stopped", `10.238.2.51`, "22", 4, "4gb", "40gb", true),
                new Host("styles/themes/hasli/assets/images/logos/os/Windows8-48.png", `windows8-1`, "not installed", "running", `10.238.3.5`, "22", 4, "4gb", "40gb", true),
                new Host("styles/themes/hasli/assets/images/logos/os/Windows8-48.png", `windows8-2`, "not installed", "running", `10.238.4.5`, "22", 4, "4gb", "40gb", true)
            ]

            this.loading = false;
        }, 500)
    }


}