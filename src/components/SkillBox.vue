<script setup lang="ts">
import { type Tag } from '@/assets/javascripts/types/Tag';

defineProps<{
    title: string;
    tags: Tag[];
}>();
</script>

<template>
    <div class="skill-box-container">
        <div class="skill-box--top">
            <font-awesome-icon class="skill-box--grip" :icon="['fal', 'grip-lines-vertical']" />
            <h3 class="skill-box--title">{{ title }}</h3>
        </div>
        <div class="skill-box">
            <div v-for="tag of tags" :key="tag.text" class="skill-box--tag">
                <i :class="'tag-icon' + tag.icon + tag.color"></i>
                <span class="tag-text">{{ tag.text }}</span>
            </div>
        </div>
    </div>
</template>
