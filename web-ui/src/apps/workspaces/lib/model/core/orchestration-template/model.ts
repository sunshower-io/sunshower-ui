import {Workspace} from "../workspace/model";

export class OrchestrationTemplate {
    id ?:           string;
    key ?:          string;
    name ?:         string;
    description ?:  string;
    modified ?:     string;
    created ?:      string;
    version ?:      Version;
    workspace       ?: Workspace;

    constructor(data?: any) {
        Object.assign(this, data);
        if (data) {
            let modified = new Date,
                created = new Date;
            modified.setTime(Date.parse(data["modified-on"]));
            created.setTime(Date.parse(data["created-on"]));
            this.modified = this.month(modified.getMonth()) +
                " " +
                modified.getDate().toString() +
                ", " +
                modified.getFullYear().toString();
            this.created = created.getMonth().toString() +
                " " +
                created.getDate().toString() +
                ", " +
                created.getFullYear().toString();
            //todo version biz
        }
    }

    toJSON() {
        return {
            "id": this.id,
            "key": this.key,
            "name": this.name,
            "description": this.description,
            "version": this.version.toJSON()
        }
    }

    month(num: number) : string {
        let monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        return monthNames[num];
    } //todo refactor to make this a utility
}

export class Version {
    major       ?: number;
    minor       ?: number;
    minorMinor  ?: number;
    extension   ?: string;

    constructor(data ?: any) {
        Object.assign(this, data);
        if(data) {
            this.minorMinor = data["minor-minor"];
        }
    }

    name() {
        return this.major.toString() + "." +
                this.minor.toString() + "." +
                this.minorMinor.toString() + "-" +
                this.extension;
    }

    toJSON() {
        return {
            "major": this.major,
            "minor": this.minor,
            "minor-minor": this.minorMinor,
            "extension": this.extension
        }
    }

}