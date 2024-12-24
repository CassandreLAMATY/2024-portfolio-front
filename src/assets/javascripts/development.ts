import { ApiHandler } from '@/api/ApiHandler';
import { ref, type Ref } from 'vue';

const apiUrl: string | null = import.meta.env.VITE_STRAPI_API_URL,
    apiToken: string | null = import.meta.env.VITE_STRAPI_API_TOKEN;

const apiHandler = new ApiHandler(apiUrl, apiToken);

export const developmentIntro: Ref<any | null> = ref(null);

/**
 * Get development intro from Strapi
 * @returns the development intro
 */
export async function getDevIntro(): Promise<any> {
    try {
        const a = await apiHandler.get('/artworks', { populate: '*' }).then((r) => {
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
