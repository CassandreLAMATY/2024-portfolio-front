<script setup lang="ts">
import ButtonPrimary from '@/components/ButtonPrimary.vue';
import SwiperContainer from '@/components/SwiperContainer.vue';

import { artworks, getArtworks } from '@/assets/javascripts/artworks';

getArtworks();
</script>

<template>
    <header>
        <div class="header-container--waves">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                <path
                    fill="#0099ff"
                    fill-opacity="1"
                    d="M0,64L34.3,53.3C68.6,43,137,21,206,42.7C274.3,64,343,128,411,165.3C480,203,549,213,617,186.7C685.7,160,754,96,823,106.7C891.4,117,960,203,1029,213.3C1097.1,224,1166,160,1234,122.7C1302.9,85,1371,75,1406,69.3L1440,64L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z"
                ></path>
            </svg>
            <div></div>
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
