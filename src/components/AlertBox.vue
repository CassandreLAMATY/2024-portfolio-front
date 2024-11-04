<script setup lang="ts">
defineProps<{
    title: string;
    content: string | null;
    icon: string[];
}>();
</script>

<template>
    <div class="alert-box">
        <font-awesome-icon :icon="icon" class="alert-icon" />
        <div class="alert-content">
            <h2 class="alert-title">{{ title }}</h2>
            <span v-if="content" class="alert-content">{{ content }}</span>
        </div>
    </div>
</template>

<style>
@import url('@/assets/stylesheets/css/alert.css');
</style>
