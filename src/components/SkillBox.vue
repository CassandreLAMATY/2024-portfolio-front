<script setup lang="ts">
import { spawnTags } from '@/assets/javascripts/skills';
import { type Tag } from '@/assets/javascripts/types/Tag';
import { onMounted } from 'vue';

const props = defineProps<{
    title: string;
    tags: Tag[];
    index: number;
}>();

onMounted(() => {
    const section = document.querySelector('.skills') as HTMLElement | null;
    const box = document.querySelector(`#box${props.index}`) as HTMLElement | null;
    const boxTags = document.querySelectorAll(`#box${props.index} > .skill-box--tag`) as NodeListOf<HTMLElement> | null;

    if (section && box && boxTags) {
        spawnTags(section, box, boxTags);
    }
});
</script>

<template>
    <div class="skill-box--container">
        <font-awesome-icon class="skill-box--grip" :icon="['fal', 'grip-lines-vertical']" />
        <div class="skill-box--content">
            <h3 class="skill-box--title">{{ title }}</h3>
            <div class="skill-box" :id="'box' + index">
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
