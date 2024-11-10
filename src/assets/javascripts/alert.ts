import { ref, watch, type Ref } from 'vue';
import type { Alert } from './entities/Alert';
import { alertHideAnimation, alertShowAnimation } from './animations';

export const alerts: Ref<Alert[]> = ref([]);

export function watchAlerts() {
    watch(
        () => alerts.value,
        (newAlerts, oldAlerts) => {
            if (newAlerts.length > oldAlerts.length) {
                const alertInstance: Alert = newAlerts[newAlerts.length - 1];
                const alert: HTMLElement | null = document.querySelectorAll('.alert-box')[
                    newAlerts.length - 1
                ] as HTMLElement;

                if (!alert) return;

                alertShowAnimation(alert);

                setTimeout(() => {
                    alertHideAnimation(alert);
                }, alertInstance.timeout);
            }
        }
    );
}
