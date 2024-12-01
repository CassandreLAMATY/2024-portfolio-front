import { computed, ref } from 'vue';

const windowWidth = ref(window.innerWidth);
export const isMobile = computed(() => windowWidth.value <= 768);

window.addEventListener('resize', () => {
    windowWidth.value = window.innerWidth;
});

export const isTablet = computed(() => windowWidth.value <= 1024);

window.addEventListener('resize', () => {
    windowWidth.value = window.innerWidth;
});
