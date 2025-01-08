import { computed, ref } from 'vue';

const windowWidth = ref(window.innerWidth);

export const isMobile = computed(() => windowWidth.value <= 768);
export const isTablet = computed(() => windowWidth.value <= 1024);
export const isLaptop = computed(() => windowWidth.value <= 1280);
export const isDesktop = computed(() => windowWidth.value <= 1536);
export const isWideScreen = computed(() => windowWidth.value <= 2560);

window.addEventListener('resize', () => {
    windowWidth.value = window.innerWidth;
});
