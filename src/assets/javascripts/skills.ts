import { ApiHandler } from '@/api/ApiHandler';
import type { Tag } from './types/Tag';
import type { StrapiResponse } from './types/StrapiResponse';
import { HandleError } from './utils/HandleError';
import { ref, type Ref } from 'vue';

const apiUrl: string | null = import.meta.env.VITE_STRAPI_API_URL;
const apiToken: string | null = import.meta.env.VITE_STRAPI_API_TOKEN;

const apiHandler = new ApiHandler(apiUrl, apiToken);

export const tags: Ref<Tag[] | null> = ref(null);

export async function getSkillTags(): Promise<Tag[] | null> {
    try {
        const t: Tag[] = await apiHandler.get<StrapiResponse<Tag>>('/skill-tags', {}).then((r) => {
            if (!r || !r.data || r.data.length === 0) {
                throw new Error('No skill tags found');
            }

            return r.data;
        });

        tags.value = t;

        return t;
    } catch (e: unknown) {
        console.error(HandleError.ensureError(e));

        return null;
    }
}
