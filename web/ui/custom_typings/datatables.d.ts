
export interface Data {
    
}

export interface Row {
    data() : Data;
}
export interface DataTable {
    row(container:JQuery) : Row;
}
interface JQuery extends DataTable {
    DataTable(cfg:any) : DataTable ; 
}




declare module "datatables" {
    
}
