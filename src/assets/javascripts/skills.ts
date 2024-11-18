import dotenv from 'dotenv';
dotenv.config();

import { apiHandler } from '@/main';
const apiToken = process.env.VUE_APP_API_TOKEN;

export async function getSkillTags() {
    const tags = await apiHandler.get('/skills/tags', {});
}
