import type { StrapiImage } from './StrapiImage';
import type { Tag } from './Tag';

export type DevProject = {
    title: string;
    icon: StrapiImage;
    description1?: string;
    description2?: string;
    image?: StrapiImage;
    skill_tags?: Tag[];
    links?: { link: string; name: string; icon: string[] }[];
    subtitle?: string;
    imagesComment?: string;
    color?: string;
    order?: number;
};
