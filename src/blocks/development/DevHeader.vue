<script setup lang="ts">
import { getDevIntro, setLeftValueOrnaments, repeatOrnament } from '@/assets/javascripts/development';
import type { DevIntro } from '@/assets/javascripts/types/DevIntro';
import ButtonPrimary from '@/components/ButtonPrimary.vue';
import ExclamationSVG from '@/components/icons/ExclamationSVG.vue';
import Ornament01SVG from '@/components/icons/Ornament01SVG.vue';
import Ornament02SVG from '@/components/icons/Ornament02SVG.vue';
import BicolorCircleSVG from '@/components/icons/BicolorCircleSVG.vue';
import DevHeader from '@/components/icons/DevHeader.vue';
import { nextTick, onMounted, onUnmounted, ref, watch, type Ref } from 'vue';

const devIntro: Ref<DevIntro | null> = ref(null);
const ornamentCount: Ref<number> = ref(repeatOrnament());

onMounted(async () => {
    devIntro.value = await getDevIntro();
});

watch(
    () => devIntro.value,
    () => {
        nextTick(() => {
            const ornaments: HTMLElement | null = document.querySelector('.devHeader-bg--content');
            const title: HTMLElement | null = document.querySelector('.devHeader-title');

            if (ornaments && title) {
                setLeftValueOrnaments(ornaments, title);

                addEventListener('resize', () => {
                    setLeftValueOrnaments(ornaments, title);
                    ornamentCount.value = repeatOrnament();
                });
            }
        });
    },
    { deep: true }
);

onUnmounted(() => {
    const ornaments: HTMLElement | null = document.querySelector('.devHeader-bg--content');
    const title: HTMLElement | null = document.querySelector('.devHeader-title');
    const circle: HTMLElement | null = document.querySelector('.devHeader-bg--circle');

    if (ornaments && title && circle) {
        addEventListener('resize', () => {
            setLeftValueOrnaments(ornaments, title);
            ornamentCount.value = repeatOrnament();
        });
    }
});
</script>

<template>
    <section class="devHeader">
        <div class="devHeader-bg">
            <DevHeader class="devHeader-bg--bg" />
            <div class="devHeader-bg--content">
                <Ornament01SVG id="ornament01" />
                <div class="ornament-container">
                    <Ornament02SVG v-for="i in ornamentCount" :key="i" id="ornament02" />
                </div>
            </div>

            <BicolorCircleSVG class="devHeader-bg--circle" />
        </div>

        <div v-if="devIntro" class="devHeader-container">
            <div class="devHeader-title--container">
                <h1 class="devHeader-title">{{ devIntro.title }}</h1>
                <ExclamationSVG class="devHeader-exclamation" fill="#99715b" stroke="#99715b" />
            </div>

            <div class="devHeader-content--container">
                <p v-html="devIntro.description" class="devHeader-content"></p>
                <div class="devHeader-btn--container">
                    <a v-for="l of devIntro.links" :key="l.link" :href="l.link">
                        <ButtonPrimary :title="l.name" :icon="l.icon" classes="btn_secondary" type="button" />
                    </a>
                </div>
            </div>
        </div>
    </section>
</template>
