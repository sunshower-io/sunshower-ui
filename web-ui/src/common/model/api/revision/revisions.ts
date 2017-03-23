
export enum RepositoryType {
    Workspace,
    Application
}


export class Repository {

    path            : string;
    name            : string;
    remote          : Remote;
    type            : RepositoryType ;

}


export class Remote {

    name            :   string;
    location        :   string;



}