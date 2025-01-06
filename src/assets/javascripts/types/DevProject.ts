import type { StrapiImage } from './StrapiImage';
import type { Tag } from './Tag';

export type DevProject = {
    title: string;
    icon: StrapiImage;
    description?: string;
    images?: StrapiImage[];
    skill_tags?: Tag[];
    links?: { link: string; name: string }[];
    subtitle?: string;
    imagesComment?: string;
};
