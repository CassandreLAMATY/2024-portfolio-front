import { apiHandler } from '@/main';

export async function getSkillTags() {
    const tags = await apiHandler.get('/skills/tags');
}
