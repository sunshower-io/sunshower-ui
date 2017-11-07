


import {HttpClient} from "aurelia-fetch-client";

export default class Identifiers {
   
    private static client: HttpClient;
    
    public static initialize(client:HttpClient) : void {
        Identifiers.client = client;
    }
    
    
    public static create() : Promise<any> {
        return Identifiers.client.fetch('identifiers')
            .then(t => t.json())
            .then(t => t);
    }
    
    
}