import { ref, type Ref } from 'vue';
import type { Alert } from './controllers/Alert';

export const alerts: Ref<Alert[]> = ref([
    {
        title: 'Hello Hello Hello',
        icon: ['fas', 'circle-info'],
        type: 'danger',
        content: 'This is a test alert.'
    },
    {
        title: 'Hello Hello Hello 2',
        icon: ['fas', 'triangle-exclamation'],
        type: 'warning',
        content: 'This is a test alert.'
    },
    {
        title: 'Hello Hello Hello',
        icon: ['fas', 'circle-info'],
        type: 'success',
        content: 'This is a test alert.'
    },
    {
        title: 'Hello Hello Hello 2',
        icon: ['fas', 'triangle-exclamation'],
        type: 'info',
        content: 'This is a test alert.'
    }
]);
