<script setup lang="ts">
import { tags, getSkillTags, initMatter } from '@/assets/javascripts/skills';
import SkillBox from '@/components/SkillBox.vue';
import { nextTick, ref, watch } from 'vue';

getSkillTags();

const section = ref<HTMLElement | null>(null);

watch(
    () => tags.value,
    async () => {
        await nextTick();

        section.value = document.querySelector('.skills') as HTMLElement | null;

        if (section.value) {
            const boxes: NodeListOf<HTMLElement> = section.value.querySelectorAll('.skill-box');

            initMatter(section.value, boxes);
        }
    }
);
</script>

<template>
    <section v-if="tags && tags.length > 0" class="skills">
        <div class="skills-container">
            <h2 class="skills-title">Skills !&nbsp;<span class="skills-title--span">(shake the boxes !)</span></h2>
            <div class="skills-banner">
                <span class="skills-banner--item">Brainstorm</span>
                <span class="skills-banner--item">Design</span>
                <span class="skills-banner--item">Development</span>
                <span class="skills-banner--item">Optimization</span>
                <span class="skills-banner--item">Deployment</span>
                <span class="skills-banner--item">Maintenance</span>
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
