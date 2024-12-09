<script setup lang="ts">
import ArtworksHeader from '@/blocks/artworks/ArtworksHeader.vue';
import ArtworksContent from '@/blocks/artworks/ArtworksContent.vue';

import { artworks, getArtworks } from '@/assets/javascripts/artworks';

getArtworks();
</script>

<template>
    <ArtworksHeader :artworks="artworks" />
    <ArtworksContent :artworks="artworks" />
</template>
