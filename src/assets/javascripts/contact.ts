import { ref } from 'vue';
import type { Ref } from 'vue';
import { copyToClipboard } from './utils';
import { alerts, closeAlert } from './alert';
import { Alert } from './entities/Alert';
import { HandleError } from './utils/HandleError';

export const personalMail: string = 'contact@lamatycassandre.me';
export const isBtnDisabled: Ref<boolean> = ref(false);

// Form
export const name: Ref<string> = ref('');
export const email: Ref<string> = ref('');
export const object: Ref<'info' | 'work' | 'other'> = ref('info');
export const customObject: Ref<string> = ref('');
export const message: Ref<string> = ref('');

// Functions
export function copyMailToClipboard(): void {
    try {
        copyToClipboard(personalMail);

        const mailIcon: HTMLElement | null = document.querySelector('.mail-copy--icon');

        if (!mailIcon) return;

        mailIcon.classList.remove('fa-copy');
        mailIcon.classList.add('fa-check');

        isBtnDisabled.value = true;

        alerts.push(new Alert('Copy successful', 'success', "You can now paste it anywhere you'd like"));
    } catch (e: unknown) {
        const mailIcon: HTMLElement | null = document.querySelector('.mail-copy--icon');

        if (!mailIcon) return;

        mailIcon.classList.remove('fa-copy');
        mailIcon.classList.add('fa-xmark');

        alerts.push(
            new Alert(
                "Couldn't copy email address to clipboard...",
                'danger',
                `Sorry, something wrong happened 😢\nYou can still copy paste it manually (without using the button)`
            )
        );

        console.error(HandleError.ensureError(e));
    } finally {
        setTimeout(() => {
            const mailIcon: HTMLElement | null = document.querySelector('.mail-copy--icon');

            if (!mailIcon) return;

            isBtnDisabled.value = false;

            mailIcon.classList.remove('fa-check');
            mailIcon.classList.remove('fa-xmark');
            mailIcon.classList.add('fa-copy');
        }, 5200);
    }
}

export function closeMailAlert(index: number): void {
    closeAlert(index);

    const mailIcon: HTMLElement | null = document.querySelector('.mail-copy--icon');

    if (!mailIcon) return;

    mailIcon.classList.remove('fa-check');
    mailIcon.classList.remove('fa-xmark');
    mailIcon.classList.add('fa-copy');
}
