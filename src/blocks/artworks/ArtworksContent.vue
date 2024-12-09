<script setup lang="ts">
import { isMobile, isTablet } from '@/assets/javascripts/global';
import type { Artwork } from '@/assets/javascripts/types/Artwork';

defineProps<{ artworks: Artwork[] }>();

const apiUrl = import.meta.env.VITE_STRAPI_URL;
</script>

<template>
    <section class="artworks">
        <div class="artworks-container">
            <div v-for="(a, i) of artworks" :key="i" class="artwork">
                <a v-if="a.links" :href="a.links.link" target="_blank">
                    <div
                        v-if="a.render && a.render.formats && a.render.formats.small && a.render.formats.medium"
                        class="artwork-img--container"
                    >
                        <img
                            :src="isTablet ? apiUrl + a.render.formats.small.url : apiUrl + a.render.formats.medium.url"
                            :alt="a.description"
                            class="artwork-img"
                        />
                    </div>
                </a>
                <div v-else-if="a.render && a.render.formats && a.render.formats.small" class="artwork-img--container">
                    <img :src="apiUrl + a.render.formats.small.url" :alt="a.description" class="artwork-img" />
                </div>
            </div>
        </div>
    </section>
</template>

<style>
@import url('@/assets/stylesheets/css/artworksContent.css');
</style>
