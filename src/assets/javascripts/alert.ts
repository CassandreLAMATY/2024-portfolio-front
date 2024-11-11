import { nextTick, reactive, ref, watch, type Ref } from 'vue';
import type { Alert } from './entities/Alert';
import { alertHideAnimation, alertShowAnimation } from './animations';

export const alerts: Alert[] = reactive([]);
export const isActiveAlerts: Ref<boolean> = ref(false);

watch(
    () => isActiveAlerts.value,
    (isActive) => {
        if (!isActive) alerts.splice(0, alerts.length);
    }
);

export function watchAlerts(): void {
    watch(
        () => [...alerts],
        (newAlerts, oldAlerts) => {
            if (newAlerts.length > oldAlerts.length) {
                isActiveAlerts.value = true;

                const alertInstance = newAlerts[alerts.length - 1];

                if (alertInstance) {
                    nextTick(() => {
                        const alertElements = document.querySelectorAll('.alert-box') as NodeListOf<HTMLElement>;
                        const alertElement: HTMLElement | undefined = alertElements[alerts.length - 1];

                        if (!alertElement) return;

                        alertShowAnimation(alertElement);

                        let timeoutId: ReturnType<typeof setTimeout>;
                        const startTimeout = () => {
                            timeoutId = setTimeout(() => {
                                alertHideAnimation(alertElement);

                                setTimeout(() => {
                                    const index = alerts.indexOf(alertInstance);
                                    if (index > -1) {
                                        alerts[index].isActive = false;

                                        if (alerts.filter((alert) => alert.isActive).length === 0) {
                                            isActiveAlerts.value = false;
                                        }
                                    }
                                }, 200);
                            }, alertInstance.timeout);
                        };

                        const clearTimeoutOnHover = () => {
                            if (timeoutId) clearTimeout(timeoutId);
                        };

                        alertElement.addEventListener('mouseenter', clearTimeoutOnHover);
                        alertElement.addEventListener('mouseleave', startTimeout);

                        startTimeout();
                    });
                }
            }
        }
    );
}

export function closeAlert(index: number): void {
    const alertElements = document.querySelectorAll('.alert-box') as NodeListOf<HTMLElement>;
    const alertElement: HTMLElement | undefined = alertElements[index];

    if (!alertElement) return;

    alertHideAnimation(alertElement);

    setTimeout(() => {
        if (index > -1) {
            alerts[index].isActive = false;

            if (alerts.filter((alert) => alert.isActive).length === 0) {
                isActiveAlerts.value = false;
            }
        }
    }, 200);
}
