<script setup lang="ts">
import { getDevIntro } from '@/assets/javascripts/development';
import type { DevIntro } from '@/assets/javascripts/types/DevIntro';
import ButtonPrimary from '@/components/ButtonPrimary.vue';
import ExclamationSVG from '@/components/icons/ExclamationSVG.vue';
import Ornament01SVG from '@/components/icons/Ornament01SVG.vue';
import Ornament02SVG from '@/components/icons/Ornament02SVG.vue';
import { onMounted, ref, type Ref } from 'vue';

const devIntro: Ref<DevIntro | null> = ref(null);

onMounted(async () => {
    devIntro.value = await getDevIntro();
});
</script>

<template>
    <section class="devHeader">
        <div class="devHeader-bg">
            <div class="devHeader-bg--content">
                <Ornament01SVG id="ornament01" />
                <div class="ornament-container">
                    <Ornament02SVG v-for="i in 20" :key="i" id="ornament02" />
                </div>
            </div>
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
