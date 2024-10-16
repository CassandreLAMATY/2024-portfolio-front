<script setup lang="ts">
import ButtonPrimary from '@/components/ButtonPrimary.vue';
import LogoSVG from '@/components/icons/LogoSVG.vue';
</script>

<template>
    <div class="desc">
        <LogoSVG class="desc-logo" />
        <div class="desc-grid">
            <div class="desc-content">
                <p class="desc-text">
                    I’m a 21-year-old Full-Stack developer with a passion for everything creativity-related.<br>
                    I’ve always liked drawing, taking pictures, writing stories... 
                    So now my goal is to keep everything as much as I can in my everyday life and never stop creating things !
                </p>

                <div class="desc-btn--container">
                    <div class="desc-btn_left">
                        <a class="btn-link" href="https://www.linkedin.com/in/cassandre-lamaty/">
                            <ButtonPrimary title="LinkedIn" :icon="['fab', 'fa-linkedin']" classes="btn_left btn_dutchWhite" />
                        </a>
                        <a href="https://www.behance.net/lamatycassandre">
                            <ButtonPrimary title="Behance" :icon="['fab', 'fa-square-behance']" classes="btn_left btn_mistyRose" />
                        </a>
                    </div>
                    <ButtonPrimary title="C.V" :icon="['far', 'folder-user']" classes="btn_right desc-cv" />
                </div>
            </div>
        </div>
    </div>
</template>

<style>
@import url('@/assets/stylesheets/css/description.css');
</style>