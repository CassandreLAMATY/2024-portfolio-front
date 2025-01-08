<script setup lang="ts">
import { Swiper } from '@/assets/javascripts/entities/Swiper';
import { register } from 'swiper/element/bundle';
import 'swiper/css';
import 'swiper/css/pagination';

import type { DevProject } from '@/assets/javascripts/types/DevProject';
import DevMobileCard from './DevMobileCard.vue';

register();

defineProps<{
    apiUrl: string;
    devProjects: DevProject[];
}>();

const swiper = new Swiper();
const options = swiper.initSwiperOptions();
</script>

<template>
    <div class="devSwiper">
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
            <swiper-slide v-for="(devProject, i) of devProjects" :key="i" class="slide-container">
                <div class="slide">
                    <DevMobileCard :devProject="devProject" :apiUrl="apiUrl" />
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
