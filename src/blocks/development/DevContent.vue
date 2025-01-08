<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue';

import DevMobileCard from '@/components/DevMobileCard.vue';

import { getDevProjects } from '@/assets/javascripts/development';
import type { DevProject } from '@/assets/javascripts/types/DevProject';

import { isLaptop } from '@/assets/javascripts/global';

const apiUrl = import.meta.env.VITE_STRAPI_URL;

const devProjects: Ref<DevProject[] | null> = ref(null);

onMounted(async () => {
    devProjects.value = await getDevProjects();
});
</script>

<template>
    <div class="devContent">
        <div v-if="isLaptop" class="devContent-container">
            <DevMobileCard v-for="(devProject, i) in devProjects" :key="i" :devProject="devProject" :apiUrl="apiUrl" />
        </div>
        <div v-else class="devContent-container">
            <DevSwiperCard v-for="(devProject, i) in devProjects" :key="i" :devProject="devProject" :apiUrl="apiUrl" />
        </div>
    </div>
</template>
