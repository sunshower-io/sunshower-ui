
export class DeployInfoForm {

    name: String;
    cloud: any;
    selectedTags: Array<String>;
    tagDropdown: any;


    constructor() {
        this.selectedTags = [];
    }

    attached() {
        $(this.tagDropdown)
            .dropdown({
                allowAdditions: true
            });

        $(this.tagDropdown).on('change', (e) => {
            if (e.target.className !== 'search') {
                this.selectedTags = $(e.target).val().split(',');
                for (let tag of this.selectedTags) {
                    console.log(`Tags selected: ${tag}`)
                }
            }
        });

    }

    detached() {
        $(this.tagDropdown)
            .dropdown('clear');
    }

}