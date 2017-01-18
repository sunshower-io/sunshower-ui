import {Banner} from 'common/banner/banner';
export class HomeDefault {

    private             pad: boolean;
    private             container: HTMLElement;


    activate(): void {

        Banner.visibility.subscribe(visible => {
            this.pad = visible;
        });
    }

    attached(): void {

    }
}