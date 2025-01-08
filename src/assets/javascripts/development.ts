import { ref, type Ref } from 'vue';
import qs from 'qs';

import { ApiHandler } from '@/api/ApiHandler';
import { HandleError } from '@/assets/javascripts/utils/HandleError';

import type { StrapiResponse, StrapiResponseUnique } from '@/assets/javascripts/types/StrapiResponse';
import type { DevProject } from '@/assets/javascripts/types/DevProject';
import type { DevIntro } from '@/assets/javascripts/types/DevIntro';
import { isMobile, isTablet } from './global';

const apiUrl: string | null = import.meta.env.VITE_STRAPI_API_URL,
    apiToken: string | null = import.meta.env.VITE_STRAPI_API_TOKEN;

const apiHandler = new ApiHandler(apiUrl, apiToken);

export const developmentIntro: Ref<any | null> = ref(null);

/**
 * Get development intro from Strapi
 * @returns the development intro
 */
export async function getDevIntro(): Promise<DevIntro | null> {
    try {
        const d = await apiHandler
            .get<StrapiResponseUnique<DevIntro>>('/development-intro', { populate: '*' })
            .then((r) => {
                if (!r || !r.data) {
                    throw new Error('No dev intro found');
                }

                return r.data;
            });

        developmentIntro.value = d;

        return d;
    } catch (e: unknown) {
        console.error(HandleError.ensureError(e));
        return null;
    }
}

/**
 * Get development projects from Strapi
 * @returns array of development projects
 */
export async function getDevProjects(): Promise<DevProject[] | null> {
    try {
        const queryString = qs.stringify(
            {
                populate: {
                    skill_tags: { populate: 'icon' },
                    image: true,
                    icon: true
                },
                sort: ['order']
            },
            { encodeValuesOnly: true }
        );

        const d: DevProject[] = await apiHandler
            .get<StrapiResponse<DevProject>>(`/dev-projects?${queryString}`)
            .then((r) => {
                if (!r || !r.data || r.data.length === 0) {
                    throw new Error('No dev project found');
                }

                return r.data;
            });

        developmentIntro.value = d;

        return d;
    } catch (e: unknown) {
        console.error(HandleError.ensureError(e));

        return null;
    }
}

export function setLeftValueOrnaments(ornaments: HTMLElement, title: HTMLElement) {
    let offset: number = 32;
    if (isMobile.value) {
        offset = 32;
    } else if (isTablet.value) {
        offset = 64;
    } else {
        offset = 96;
    }

    // Flat, not using the rotation
    const titleRightSideOffset: number = title.getBoundingClientRect().left + title.offsetWidth;
    const titleTopOffset: number =
        title.getBoundingClientRect().top + window.scrollY + title.getBoundingClientRect().height / 2;

    // Using rotation
    const ornamentPos = Math.sqrt(Math.pow(titleRightSideOffset, 2) + Math.pow(titleTopOffset, 2)) + offset;

    ornaments.style.left = `${ornamentPos}px`;
}

export function repeatOrnament(): number {
    const baseWidth: number = 1664;
    const maxWidth: number = 2560;
    const baseCount: number = 10;
    const increment: number = 128;

    if (window.innerWidth > baseWidth) {
        for (let i = 0; baseWidth + i * increment <= maxWidth; i++) {
            if (window.innerWidth < baseWidth + i * increment) return baseCount + (i + 1) * 2;
        }
    }

    return baseCount;
}
