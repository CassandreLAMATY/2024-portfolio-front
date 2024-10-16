<script setup lang="ts">
import { onMounted } from 'vue';

import { meHeightCalc } from '@/assets/javascripts/header';

import LogoSVG from '@/components/icons/LogoSVG.vue';

onMounted(() => {
    meHeightCalc();

    window.addEventListener('resize', () => {
        meHeightCalc();
    });
});
</script>

<template>
    <header>
        <div class="bg">
            <div class="sun-container">
                <div class="sun">
                    <div class="sun-aura" id="aura01"></div>
                    <div class="sun-aura" id="aura02"></div>
                    <div class="sun-sphere">
                        <div class="sun-logo--container">
                            <LogoSVG class="sun-logo" />
                        </div>
                    </div>
                </div>
            </div>

            <div class="mountains">
                <div class="mountains-container">
                    <svg>
                        <defs>
                            <linearGradient id="gradient1" x1="0%" y1="0%" x2="0%" y2="67%"  gradientUnits="userSpaceOnUse">
                                <stop offset="0%" style="stop-color: #433432; stop-opacity: 1" />
                                <stop offset="100%" style="stop-color: #57423e; stop-opacity: 1" />
                            </linearGradient>
                        </defs>
                    </svg>

                    <svg
                        viewBox="0 0 100 100"
                        xmlns="http://www.w3.org/2000/svg"
                        class="mountain"
                        id="mountain02"
                    >
                        <polygon points="50 15, 120 100, 0 100" fill="url(#gradient1)" />
                    </svg>
                    <svg
                        viewBox="0 0 100 100"
                        xmlns="http://www.w3.org/2000/svg"
                        class="mountain"
                        id="mountain03"
                    >
                        <polygon points="50 50, 100 100, 15 100" fill="url(#gradient1)" />
                    </svg>
                    <svg
                        viewBox="0 0 100 100"
                        xmlns="http://www.w3.org/2000/svg"
                        class="mountain"
                        id="mountain01"
                    >
                        <polygon points="100 -50, 100 100, 0 100" fill="url(#gradient1)" />
                    </svg>
                    <svg
                        viewBox="0 0 100 100"
                        xmlns="http://www.w3.org/2000/svg"
                        class="mountain"
                        id="mountain04"
                    >
                        <polygon points="0 15, 100 100, 0 100" fill="url(#gradient1)" />
                    </svg>
                </div>
                <div id="mountain01-body"></div>
            </div>
        </div>
        <div class="me-container">
            <div class="me-grid">
                <div class="me">
                    <h3 class="me-overline">Hello, world ! I'm</h3>
                    <h1 class="me-name">
                        <span class="me-name" id="firstname">Cassandre</span>
                        <span class="me-name" id="name">LAMATY</span>
                    </h1>
                </div>
            </div>
        </div>
    </header>
</template>

<style>
@import url('@/assets/stylesheets/css/header.css');
</style>
