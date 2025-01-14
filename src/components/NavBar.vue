<script setup lang="ts">
import { toggleMenu, isActive } from '@/assets/javascripts/navbar';
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const activeRoute = ref(route.path);

watch(route, () => {
    activeRoute.value = route.path;
});
</script>

<template>
    <nav :class="`nav-container ${isActive ? 'active' : ''}`">
        <div class="nav-content--container">
            <router-link v-if="activeRoute !== '/'" class="nav-short--link" to="/portfolio">
                <button class="nav-short">
                    <span>{{ 'home' }}</span>
                    <font-awesome-icon :icon="['fas', 'turn-left']" />
                </button>
            </router-link>
            <menu class="nav-content">
                <router-link class="nav-content--link" to="/artworks">
                    <font-awesome-icon :icon="['fas', 'paintbrush']" />
                    <span>Art.</span>
                </router-link>
                <router-link class="nav-content--link" to="/development">
                    <font-awesome-icon :icon="['fas', 'code']" />
                    <span>Dev.</span>
                </router-link>
            </menu>
        </div>
        <div class="nav-toggle--container">
            <button v-on:click="toggleMenu()" type="button" aria-label="Toggle navigation bar" class="nav-toggle">
                <font-awesome-icon class="nav-toggle--compass" :icon="['far', 'compass']" />
                <font-awesome-icon class="nav-toggle--open" :icon="['fas', 'caret-down']" />
            </button>
        </div>
    </nav>
</template>

<style>
@import url('@/assets/stylesheets/css/navbar.css');
</style>
