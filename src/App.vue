<script setup lang="ts">
import { RouterView } from 'vue-router';
import AlertBox from './components/AlertBox.vue';

import { alerts } from './assets/javascripts/alert';
</script>

<template>
    <RouterView />

    <div v-if="alerts.length > 0" class="alert-container">
        <AlertBox v-for="a of alerts" :key="a.title" :title="a.title" :content="a.content" :icon="a.icon" />
    </div>
</template>
