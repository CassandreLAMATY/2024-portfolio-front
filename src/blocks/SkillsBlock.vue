<script setup lang="ts">
import SkillBox from '@/components/SkillBox.vue';
</script>

<template>
    <section class="skills">
        <div class="skills-container">
            <h2 class="skills-title">Skills !<span class="skills-title--span">(shake the boxes !)</span></h2>
            <div class="skills-banner">
                <span class="skills-banner--item">Brainstorm</span>
                <span class="skills-banner--item">Design</span>
                <span class="skills-banner--item">Development</span>
                <span class="skills-banner--item">Optimization</span>
                <span class="skills-banner--item">Deployment</span>
                <span class="skills-banner--item">Maintenance</span>
            </div>
            <div class="skills-boxes--container">
                <SkillBox />
            </div>
        </div>
    </section>
</template>
