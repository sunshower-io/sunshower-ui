export interface NavigatorLevel {
    name                : string;
    icon                ?: string;
    color               ?: string;


    breadcrumbs         ?: NavigatorLevel[];
    children            ?: NavigatorLevel[];

}

export abstract class AbstractNavigatorLevel {

}