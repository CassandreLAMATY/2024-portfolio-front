<script setup lang="ts">
import { btnRoundAnimation } from '@/assets/javascripts/gsap';
import type { DevProject } from '@/assets/javascripts/types/DevProject';
import { onMounted } from 'vue';

defineProps<{
    apiUrl: string;
    devProject: DevProject;
}>();

onMounted(() => {
    const btnsRound: NodeListOf<HTMLElement> = document.querySelectorAll('.btn-round');

    if (btnsRound) {
        btnsRound.forEach((btn) => {
            btn.addEventListener('mouseenter', () => {
                btnRoundAnimation(btn);
            });
        });
    }
});
</script>

<template>
    <div :class="`devCard  ${devProject.color ? devProject.color : ''}`">
        <div class="devCard-container">
            <!-- TOP -->
            <div class="devCard-top">
                <!-- TITLE-->
                <div class="devCard-top--container">
                    <div class="title-container">
                        <img
                            v-if="devProject.icon"
                            class="title-icon"
                            :src="apiUrl + devProject.icon.url"
                            :alt="devProject.icon.alternativeText"
                        />
                        <h2 class="title">{{ devProject.title }}</h2>
                    </div>
                    <hr v-if="devProject.subtitle" class="separator" />
                    <span v-if="devProject.subtitle" class="subtitle" v-html="devProject.subtitle"></span>
                </div>

                <!-- LINKS -->
                <div v-if="devProject.links" class="title-links">
                    <a
                        v-for="(link, i) of devProject.links"
                        :key="i"
                        class="btn-round--link"
                        :href="link.link"
                        target="_blank"
                        :title="link.name"
                    >
                        <button class="btn-round" :aria-label="link.name">
                            <font-awesome-icon :icon="link.icon" />
                        </button>
                    </a>
                </div>
            </div>
            <!-- CONTENT -->
            <div class="devCard-content">
                <p class="devCard-content--intro" v-html="devProject.description1"></p>
                <div class="devCard-content--image-container">
                    <img
                        class="devCard-content--image"
                        v-if="devProject.image"
                        :src="apiUrl + devProject.image.url"
                        :alt="devProject.image.alternativeText"
                    />
                </div>
                <p class="devCard-content--text" v-html="devProject.description2"></p>
            </div>

            <!-- TAGS -->
            <div v-if="devProject.skill_tags && devProject.skill_tags.length > 0" class="devCard-tags--container">
                <hr class="separator" />
                <div class="tags-container">
                    <div
                        v-for="(tag, i) of devProject.skill_tags"
                        :key="i"
                        :class="`tag ${tag.color} ${!tag.text ? 'no-text' : ''}`"
                    >
                        <img
                            v-if="tag.icon"
                            :src="apiUrl + tag.icon.url"
                            :alt="tag.icon.alternativeText"
                            class="tag-icon"
                        />
                        <span v-if="tag.text" class="tag-text">{{ tag.text }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
