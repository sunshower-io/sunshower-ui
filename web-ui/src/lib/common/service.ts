export * from './service/service-manager';

export interface Service<T> {
    bind(key: string): Promise<T>;
}