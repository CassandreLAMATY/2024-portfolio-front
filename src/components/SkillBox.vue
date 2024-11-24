<script setup lang="ts">
import { type Tag } from '@/assets/javascripts/types/Tag';

defineProps<{
    title: string;
    tags: Tag[];
}>();
</script>

<template>
    <div class="skill-box--container">
        <font-awesome-icon class="skill-box--grip" :icon="['fal', 'grip-lines-vertical']" />
        <div class="skill-box--content">
            <h3 class="skill-box--title">{{ title }}</h3>
            <div class="skill-box">
                <div v-for="t of tags" :key="t.text" :class="'skill-box--tag ' + t.color">
                    <img
                        class="tag-icon"
                        v-if="t.icon && t.icon.url"
                        :src="'https://strapidev.lamatycassandre.me/' + t.icon.url"
                        :alt="t.icon.alternativeText ?? 'logo'"
                    />
                    <span class="tag-text">{{ t.text }}</span>
                </div>
            </div>
        </div>
    </div>
</template>
