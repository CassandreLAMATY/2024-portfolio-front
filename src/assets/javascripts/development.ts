import { ref, type Ref } from 'vue';

import { ApiHandler } from '@/api/ApiHandler';
import { HandleError } from '@/assets/javascripts/utils/HandleError';

import type { StrapiResponse, StrapiResponseUnique } from '@/assets/javascripts/types/StrapiResponse';
import type { DevProject } from '@/assets/javascripts/types/DevProject';
import type { DevIntro } from '@/assets/javascripts/types/DevIntro';

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
        const d: DevProject[] = await apiHandler
            .get<StrapiResponse<DevProject>>('/dev-projects', { populate: '*' })
            .then((r) => {
                if (!r || !r.data || r.data.length === 0) {
                    throw new Error('No dev projects found');
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
