<script setup lang="ts">
import ButtonPrimary from '@/components/ButtonPrimary.vue';
</script>

<template>
    <div class="desc">
        <div class="desc-grid">
            <div class="desc-content">
                <p class="desc-text">
                    I’m a 21-year-old Full-Stack developer with a passion for everything creativity-related.<br>
                    I’ve always liked drawing, taking pictures, writing stories... 
                    So now my goal is to keep everything as much as I can in my everyday life and never stop creating things !
                </p>

                <div class="desc-btn--container">
                    <div class="desc-btn_left">
                        <ButtonPrimary title="LinkedIn" :icon="['fab', 'fa-linkedin']" classes="btn_left btn_dutchWhite" />
                        <ButtonPrimary title="Behance" :icon="['fab', 'fa-square-behance']" classes="btn_left btn_mistyRose" />
                    </div>
                    <ButtonPrimary title="C.V" :icon="['far', 'folder-user']" classes="btn_right" />
                </div>
            </div>
        </div>
    </div>
</template>

<style>
@import url('@/assets/stylesheets/css/description.css');
</style>