import { ref } from 'vue';
import type { Ref } from 'vue';
import { copyToClipBoard } from './utils';
import { alerts, closeAlert } from './alert';
import { Alert } from './entities/Alert';
import { alertHideAnimation } from './animations';

export const personalMail: string = 'contact@lamatycassandre.me';

// Form
export const name: Ref<string> = ref('');
export const email: Ref<string> = ref('');
export const object: Ref<'info' | 'work' | 'other'> = ref('info');
export const customObject: Ref<string> = ref('');
export const message: Ref<string> = ref('');

export function copyMailToClipboard(): void {
    try {
        copyToClipBoard(personalMail);

        const mailIcon: HTMLElement | null = document.querySelector('.mail-copy--icon');

        if (!mailIcon) return;

        mailIcon.classList.remove('fa-copy');
        mailIcon.classList.add('fa-check');

        alerts.push(
            new Alert(
                'Email address successfully copied to clipboard !',
                'success',
                "You can now paste it anywhere you'd like"
            )
        );
    } catch (e) {
        const mailIcon: HTMLElement | null = document.querySelector('.mail-copy--icon');
        console.log(mailIcon);

        if (!mailIcon) return;

        mailIcon.classList.remove('fa-copy');
        mailIcon.classList.add('fa-xmark');

        alerts.push(
            new Alert(
                "Couldn't copy email address to clipboard...",
                'danger',
                'Sorry, something wrong happened 😢 You can still copy paste it manually (without using the button)'
            )
        );
    } finally {
        setTimeout(() => {
            const mailIcon: HTMLElement | null = document.querySelector('.mail-copy--icon');

            if (!mailIcon) return;

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
