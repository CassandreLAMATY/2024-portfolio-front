import { ref } from 'vue';
import type { Ref } from 'vue';

export const name: Ref<string> = ref('');
export const email: Ref<string> = ref('');
export const object: Ref<'info' | 'work' | 'other'> = ref('info');
export const customObject: Ref<string> = ref('');
export const message: Ref<string> = ref('');
