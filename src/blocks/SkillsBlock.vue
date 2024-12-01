<script setup lang="ts">
import { nextTick, ref, watch } from 'vue';

import SkillBox from '@/components/SkillBox.vue';
import SkillsBannerTags from '@/components/SkillsBannerTags.vue';

import { isTablet } from '@/assets/javascripts/global';
import { tags, getSkillTags, initMatter, watchResize } from '@/assets/javascripts/skills';

getSkillTags();

const section = ref<HTMLElement | null>(null);

watch(
    () => tags.value,
    async () => {
        await nextTick();

        section.value = document.querySelector('.skills') as HTMLElement | null;

        if (section.value) {
            const boxes: NodeListOf<HTMLElement> = section.value.querySelectorAll('.skill-box');
            const tags: NodeListOf<HTMLElement> = section.value.querySelectorAll('.skill-box--tag');

            initMatter(section.value, boxes);
            watchResize(section.value, boxes, tags);
        }
    }
);
</script>

<template>
    <section v-if="tags && tags.length > 0" class="skills">
        <div class="skills-container">
            <h2 class="skills-title">
                Skills !&nbsp;<span class="skills-title--span">(<span>punch</span> the tags !)</span>
            </h2>
            <div class="skills-banner">
                <div class="skills-banner--container">
                    <SkillsBannerTags :isAriaHidden="false" />
                    <SkillsBannerTags :isAriaHidden="true" />
                    <SkillsBannerTags v-if="!isTablet" :isAriaHidden="true" />
                    <SkillsBannerTags v-if="!isTablet" :isAriaHidden="true" />
                </div>
            </div>
            <div class="skills-boxes--container">
                <SkillBox
                    v-for="(c, index) of tags"
                    :key="c.category"
                    :title="c.category"
                    :tags="c.tags"
                    :index="index"
                />
            </div>
        </div>
    </section>
</template>

<style>
@import url('@/assets/stylesheets/css/skills.css');
</style>
