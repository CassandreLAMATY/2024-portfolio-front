<script setup lang="ts">
import type { Artwork } from '@/assets/javascripts/types/Artwork';
import ButtonPrimary from '@/components/ButtonPrimary.vue';
import SwiperContainer from '@/components/SwiperContainer.vue';

defineProps<{ artworks: Artwork[] }>();
</script>

<template>
    <header>
        <div class="header-container--waves">
            <div class="waves-bg"></div>
        </div>
        <div class="header-container">
            <!-- <div class="header-container--circle"></div> -->

            <div class="header-intro">
                <div class="header-intro--title">
                    <h1>Artworks</h1>
                </div>
                <div class="header-intro--content">
                    <p class="header-intro--text">
                        Lorem ipsum je sais pas quoi écrire mais il me faut une description rapide et efficace pour ce
                        bloc iut de Troyes Métiers du multimédia et de l'internet
                    </p>
                    <div>
                        <a class="btn-link" href="https://www.behance.net/lamatycassandre" target="_blank">
                            <ButtonPrimary
                                title="Behance"
                                :icon="['fab', 'fa-square-behance']"
                                classes="btn_secondary btn_mistyRose"
                                type="button"
                            />
                        </a>
                    </div>
                </div>
            </div>

            <SwiperContainer v-if="artworks" :content="artworks" />
        </div>
    </header>
</template>

<style>
@import url('@/assets/stylesheets/css/artworksHeader.css');
</style>
