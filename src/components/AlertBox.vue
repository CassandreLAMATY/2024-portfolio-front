<script setup lang="ts">
defineProps<{
    title: string;
    content: string | null;
    icon: string[];
    type: 'info' | 'success' | 'warning' | 'danger';
}>();
</script>

<template>
    <div :class="'alert-box ' + type">
        <font-awesome-icon :icon="icon" class="alert-icon" />
        <div class="alert-content">
            <h2 class="alert-title">{{ title }}</h2>
            <span v-if="content" class="alert-content">{{ content }}</span>
        </div>
        <font-awesome-icon :icon="['far', 'xmark']" class="alert-close" />
    </div>
</template>

<style>
@import url('@/assets/stylesheets/css/alert.css');
</style>
