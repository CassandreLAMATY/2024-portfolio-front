import { ref, type Ref } from 'vue';
import type { Alert } from './controllers/Alert';

export const alerts: Ref<Alert[]> = ref([
    {
        title: 'Hello',
        icon: ['fas', 'fa-hand-sparkles'],
        content: 'This is a test alert.'
    }
]);
