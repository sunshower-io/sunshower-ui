export interface NavigatorLevel {
    name                : string;
    icon                ?: string;

    children            ?: NavigatorLevel[];

}

export abstract class AbstractNavigatorLevel {

}