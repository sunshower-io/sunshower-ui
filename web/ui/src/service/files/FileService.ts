import {HttpClient} from "aurelia-fetch-client";
import {inject} from "aurelia-dependency-injection";
import {autoinject} from "aurelia-dependency-injection";

export class RemoteFile {
    constructor(public name:string) {}
}
@autoinject()
export class RemoteFileService {
    
    constructor(private httpService:HttpClient) {
        
    }
    
    
    getRoot() : RemoteFile {
        return null;
    }


    
    load(file:RemoteFile, onLoad:(f:string, text:string) => void) : void {
        this.httpService.fetch('/backend/configurations/' + file.name).then(response => {
            response.text().then(t => {
                onLoad(response.url, t)
            })
        })
    }

    public list(
        file:RemoteFile, 
        filter:(f:RemoteFile) => boolean
    ):Array<RemoteFile> {
        return [];
    }


}