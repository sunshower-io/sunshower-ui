export interface NavigatorLevel {
    name                : string;
    icon                ?: string;
    color               ?: string;

    children            ?: NavigatorLevel[];

}

export abstract class AbstractNavigatorLevel {

}