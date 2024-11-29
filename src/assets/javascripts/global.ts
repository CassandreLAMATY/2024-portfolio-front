import { computed, ref } from 'vue';

const windowWidth = ref(window.innerWidth);
export const isMobile = computed(() => windowWidth.value <= 768);

window.addEventListener('resize', () => {
    windowWidth.value = window.innerWidth;
});
