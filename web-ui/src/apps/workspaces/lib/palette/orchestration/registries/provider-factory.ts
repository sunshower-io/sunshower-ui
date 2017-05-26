import {ElementFactoryProvider, ElementFactory, DefaultElementFactory} from "lib/designer/canvas/palette";
import {Role} from "lib/common/security/model/user";
import {Canvas} from "lib/designer/canvas/canvas";
import {Drawable} from "lib/designer/model/elements";

export class RegistryProviderFactory implements ElementFactoryProvider {
    icon : string = 'mdi-apps';

    load() : Promise<ElementFactory[]> {
        return Promise.resolve([

        ]);
    }
}

export class RegistryElementFactory extends DefaultElementFactory {
    rolesAllowed: Role[] = [new Role('admin'), new Role('tenant:user')];
    elementName: string;
    displayIcon: string;
    paletteIcon: string;

    initialize(canvas: Canvas, element: HTMLElement): void {
        super.initialize(canvas, element);
    }

    newElement(x: number, y: number, event: Event, canvas: Canvas, target: any): Drawable {
        return null;
        //provider element(x, y)
        //todo finish
    }

}