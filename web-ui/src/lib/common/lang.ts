export * from './lang/uuid';
export * from './lang/class';
export * from './lang/enum';
export * from './lang/identifier';

export const range = (start, end) => Array.from({length: (end - start)}, (v, k) => k + start);

export interface Cloneable<T> {
     clone<U extends Cloneable<T>>(): U;
}
