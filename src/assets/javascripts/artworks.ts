import { ref, type Ref } from 'vue';

import { ApiHandler } from '@/api/ApiHandler';
import { HandleError } from './utils/HandleError';

import type { StrapiResponse } from './types/StrapiResponse';
import type { Artwork } from './types/Artwork';

const apiUrl: string | null = import.meta.env.VITE_STRAPI_API_URL,
    apiToken: string | null = import.meta.env.VITE_STRAPI_API_TOKEN;

const apiHandler = new ApiHandler(apiUrl, apiToken);

export const artworks: Ref<any | null> = ref(null);

/**
 * Get all artworks from Strapi
 * @returns a list of artworks
 */
export async function getArtworks(): Promise<Artwork[] | null> {
    try {
        const a: Artwork[] = await apiHandler.get<StrapiResponse<Artwork>>('/artworks', { populate: '*' }).then((r) => {
            if (!r || !r.data || r.data.length === 0) {
                throw new Error('No artwork found');
            }

            return r.data;
        });

        artworks.value = a;

        return a;
    } catch (e: unknown) {
        console.error(HandleError.ensureError(e));

        return null;
    }
}
