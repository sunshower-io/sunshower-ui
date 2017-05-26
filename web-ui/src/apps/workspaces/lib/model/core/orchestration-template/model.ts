import {Workspace} from "../workspace/model";

export class VersionedItem {
    version ?: Version
}

export class OrchestrationTemplate extends VersionedItem {
    id ?: string;
    key ?: string;
    name ?: string;
    description ?: string;
    modified ?: string;
    created ?: string;
    workspace       ?: Workspace;

    constructor(data?: any) {
        super();
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
            this.version = new Version(data["version"]);
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

    month(num: number): string {
        let monthNames = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
        ];
        return monthNames[num];
    }
}

export class Version {
    major       ?: number;
    minor       ?: number;
    minorMinor  ?: number;
    extension   ?: string;
    id          ?: string;

    constructor(data ?: any) {
        Object.assign(this, data);
        if (data) {
            this.minorMinor = data["minor-minor"];
        }
    }

    name() {
        // return this.major.toString() + "." +
        //     this.minor.toString() + "." +
        //     this.minorMinor.toString() + "-" +
        //     this.extension;
        return "1.0.0-FINAL";
    }

    toJSON() {
        return {
            "major": this.major,
            "minor": this.minor,
            "minor-minor": this.minorMinor,
            "extension": this.extension,
            "id": this.id
        }
    }

}