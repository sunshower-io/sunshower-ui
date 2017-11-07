

import {Vertex} from "lib/designer/model/graph/vertex";
import {Canvas} from "lib/designer/canvas/canvas";

export class ContentDefinition {
    type        : string;
    handler     : string;
}


export class Mapping   {
    key         : string;
    value       : string;
}


export class HandlerMappings {
  
    mappings: Map<string, string> = new Map<string, string>();
   
    configure(mappings: Mapping[]) {
        this.mappings.clear();
        for(let mapping of mappings) {
            this.mappings.set(mapping.key, mapping.value);
        }
    }
    
    
    
    
    lookup(handler: string) : string {
        return this.mappings.get(handler);
    }
} 



export class EditorModel {
    canvas      : Canvas;
    vertex      : Vertex;
    mappings    : Mapping[];
    handlers    : ContentDefinition[]
}