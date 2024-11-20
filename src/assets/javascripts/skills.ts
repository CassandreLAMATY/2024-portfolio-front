import { ApiHandler } from '@/api/ApiHandler';

import dotenv from 'dotenv';
dotenv.config();

const apiUrl: string | null = import.meta.env.VITE_STRAPI_BACKEND_URL;
const apiToken: string | null = import.meta.env.VITE_STRAPI_API_TOKEN;

const apiHandler = new ApiHandler(apiUrl, apiToken);

export async function getSkillTags() {
    const tags = await apiHandler.get('/skill-tags', {});
}
