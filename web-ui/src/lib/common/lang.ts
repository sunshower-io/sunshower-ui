export * from './lang/uuid';
export * from './lang/class';
export * from './lang/enum';
export * from './lang/identifier';


export interface Cloneable<T> {
     clone<U extends Cloneable<T>>(): U;
}
