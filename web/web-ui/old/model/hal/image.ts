export class Image {
    large_2x: string;
    large: string;
    small: string;
    small_2x: string;
}

export class ImageDescriptor {

    id      : string;
    pid     : string;

    name    : string;

    logo_url: Image;
}
