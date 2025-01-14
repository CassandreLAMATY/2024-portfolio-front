<script setup lang="ts">
import { RouterView } from 'vue-router';
import AlertBox from './components/AlertBox.vue';
import FooterBlock from './blocks/FooterBlock.vue';
import NavBar from '@/components/NavBar.vue';

import { alerts, watchAlerts } from './assets/javascripts/alert';
import { onMounted } from 'vue';

onMounted(() => {
    watchAlerts();
});
</script>

<template>
    <NavBar />

    <RouterView />

    <div v-if="alerts.length > 0" class="alert-container">
        <AlertBox
            v-for="a of alerts"
            :key="a.title"
            :title="a.title"
            :content="a.content"
            :icon="a.icon"
            :type="a.type"
            :index="alerts.indexOf(a)"
        />
    </div>

    <FooterBlock />
</template>
