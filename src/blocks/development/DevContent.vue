<script setup lang="ts">
import { register } from 'swiper/element/bundle';
import 'swiper/css';
import 'swiper/css/pagination';

import { Swiper } from '@/assets/javascripts/entities/Swiper';
import { getDevProjects } from '@/assets/javascripts/development';
import { onMounted, ref, type Ref } from 'vue';
import type { DevProject } from '@/assets/javascripts/types/DevProject';

const apiUrl = import.meta.env.VITE_STRAPI_URL;

register();

const swiper = new Swiper();
const options = swiper.initSwiperOptions();

const devProjects: Ref<DevProject[] | null> = ref(null);

onMounted(async () => {
    devProjects.value = await getDevProjects();

    console.log(devProjects.value);
});
</script>

<template>
    <div v-if="devProjects" class="devContent-swiper--container">
        <swiper-container
            :slides-per-view="options.slidesPerView"
            :space-between="options.spaceBetween"
            :centered-slides="options.centerSlides"
            :loop="options.loop"
            :pagination="options.pagination"
            :navigation="options.navigation"
            :breakpoints="options.breakpoints"
            :content="devProjects"
            :autoplay="options.autoplay"
            class="custom_swiper"
        >
            <swiper-slide v-for="(c, i) of devProjects" :key="i" class="swiper-slide--container">
                <div class="swiper-slide">
                    <div class="swiper-slide--top">
                        <div class="swiper-slide--content">
                            <div class="swiper-slide--title">
                                <div class="title">
                                    <img :src="apiUrl + c.icon.url" :alt="c.icon.alternativeText" />
                                    <h2>{{ c.title }}</h2>
                                </div>
                                <div class="swiper-slide--separator"></div>
                                <span class="subtitle" v-html="c.subtitle"></span>
                            </div>
                            <div>
                                <p v-html="c.description"></p>
                            </div>
                        </div>
                        <div class="swiper-slide--imgs">
                            <img
                                v-for="i of c.images"
                                :key="i.url"
                                class="image"
                                :src="apiUrl + i.url"
                                :alt="i.alternativeText"
                            />
                            <span>{{ c.imagesComment }}</span>
                        </div>
                    </div>
                    <div class="swiper-slide--bottom">
                        <div class="tags">
                            <span v-for="(tag, i) of c.skill_tags" :key="i" class="tag">{{ tag.text }}</span>
                        </div>
                        <div class="links">
                            <a v-for="(link, i) of c.links" :key="i" :href="link.link" class="link">
                                <font-awesome-icon :icon="['fas', 'external-link-alt']" />
                                <span>{{ link.name }}</span>
                            </a>
                        </div>
                    </div>
                </div>
            </swiper-slide>
        </swiper-container>
        <div class="swiper-utils">
            <div class="custom_swiper-navigation">
                <button class="custom_swiper-navigation--next" type="button" aria-label="Previous">
                    <font-awesome-icon :icon="['fas', 'square-chevron-left']" />
                </button>
                <button class="custom_swiper-navigation--prev" type="button" aria-label="Next">
                    <font-awesome-icon :icon="['fas', 'square-chevron-right']" />
                </button>
            </div>
            <div class="custom_swiper-pagination"></div>
        </div>
    </div>
</template>
