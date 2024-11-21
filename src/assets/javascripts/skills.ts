import { ApiHandler } from '@/api/ApiHandler';
import type { Tag, TagsByCategory } from './types/Tag';
import type { StrapiResponse } from './types/StrapiResponse';
import { HandleError } from './utils/HandleError';
import { ref, type Ref } from 'vue';

const apiUrl: string | null = import.meta.env.VITE_STRAPI_API_URL;
const apiToken: string | null = import.meta.env.VITE_STRAPI_API_TOKEN;

const apiHandler = new ApiHandler(apiUrl, apiToken);

export const tags: Ref<TagsByCategory[] | null> = ref(null);

export async function getSkillTags(): Promise<TagsByCategory[] | null> {
    try {
        const t: Tag[] = await apiHandler.get<StrapiResponse<Tag>>('/skill-tags', { populate: '*' }).then((r) => {
            if (!r || !r.data || r.data.length === 0) {
                throw new Error('No skill tags found');
            }

            return r.data;
        });

        const categories: string[] = Array.from(new Set(t.map((tag: Tag) => tag.category)));
        const tagsByCategory: TagsByCategory[] = categories.map((c: string) => {
            const tags: Tag[] = t.filter((tag: Tag) => tag.category === c);

            return {
                category: c,
                tags: tags
            };
        });

        tags.value = tagsByCategory;
        console.log('tags', tags.value);

        return tagsByCategory;
    } catch (e: unknown) {
        console.error(HandleError.ensureError(e));

        return null;
    }
}
