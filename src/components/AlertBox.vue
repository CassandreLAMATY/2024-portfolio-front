<script setup lang="ts">
import { closeMailAlert } from '@/assets/javascripts/contact';

defineProps<{
    title: string;
    content: string | null;
    icon: string[];
    type: 'info' | 'success' | 'warning' | 'danger';
    index: number;
}>();
</script>

<template>
    <div :class="'alert-box ' + type">
        <font-awesome-icon :icon="icon" class="alert-icon" />
        <div class="alert-content">
            <h2 class="alert-title">{{ title }}</h2>
            <span v-if="content" class="alert-content">{{ content }}</span>
        </div>
        <button aria-label="close" type="button" v-on:click="closeMailAlert(index)">
            <font-awesome-icon :icon="['far', 'xmark']" class="alert-close" />
        </button>
    </div>
</template>

<style>
@import url('@/assets/stylesheets/css/alert.css');
</style>
