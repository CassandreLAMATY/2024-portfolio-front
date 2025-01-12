import type { StrapiImage } from './StrapiImage';

export type Artwork = {
    title?: string;
    type?: string;
    description?: string;
    year?: number;
    links?: Link;
    render?: StrapiImage;
    swiperRender?: StrapiImage;
    wips?: StrapiImage[];
};

type Link = {
    link?: string;
    platform?: string;
    color?: string;
    tools?: string[];
};
