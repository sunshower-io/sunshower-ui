export class File {
    id              :   string;
    path            :   string;
    directory       :   boolean;
}

export module Files {
    export function getName(file:File) : string {
        if(file == null) {
            return null;
        }
        let segments = file.path.split('/').filter(t => t !== ""),
            length = segments.length;
        return segments[length - 1];
    }
}