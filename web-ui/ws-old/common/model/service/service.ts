import * as _ from 'lodash';

export interface Service<T> {

    bind(key:string) : Promise<T>;
}

export class PropertyViolation {
    path                : string;
    value               : string;
    message             : string;
    constraintType      : string;
}
export class ConstraintViolationException {

    propertyViolations : Map<string, PropertyViolation>;

    constructor(data:any) {
        if(data && data.propertyViolations) {
            this.propertyViolations = new Map<string, PropertyViolation>();
            for(let v of data.propertyViolations) {
                this.propertyViolations.set(
                    v.path, Object.assign(v, new PropertyViolation()));

            }
        }
    }

    getPropertyViolations() : PropertyViolation[] {
        return Array.from(this.propertyViolations.values());
    }

    getPropertyViolation(key:string) : PropertyViolation {
        return this.propertyViolations && this.propertyViolations.get(key);
    }


}

