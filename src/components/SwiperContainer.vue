<script setup lang="ts">
import { register } from 'swiper/element/bundle';
import 'swiper/css';
import 'swiper/css/pagination';

import type { Artwork } from '@/assets/javascripts/types/Artwork';
import { Swiper } from '@/assets/javascripts/entities/Swiper';

defineProps<{
    content: Artwork[];
}>();

register();

const apiUrl = import.meta.env.VITE_STRAPI_URL;

const swiper = new Swiper();
const options = swiper.initSwiperOptions();
</script>

<template>
    <div class="custom_swiper-container">
        <swiper-container
            :slides-per-view="options.slidesPerView"
            :space-between="options.spaceBetween"
            :centered-slides="options.centerSlides"
            :loop="options.loop"
            :pagination="options.pagination"
            :navigation="options.navigation"
            :breakpoints="options.breakpoints"
            :content="content"
            :autoplay="options.autoplay"
            class="custom_swiper"
        >
            <swiper-slide v-for="(c, i) of content" :key="i" class="swiper-slide--container">
                <div class="swiper-slide">
                    <img class="swiper-slide--img" src="https://placehold.co/1920x1080" />
                    <div class="swiper-slide--content">
                        <h2>{{ c.title }}</h2>
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

<style>
@import url('@/assets/stylesheets/css/swiper.css');
</style>
