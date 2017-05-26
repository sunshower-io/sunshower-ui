import {ElementFactoryProvider, ElementFactory} from "lib/designer/canvas/palette";
export class RegistryProviderFactory implements ElementFactoryProvider {
    icon : string = 'mdi-apps';

    load() : Promise<ElementFactory[]> {
        return Promise.resolve([

        ]);
    }
}