import { ref } from 'vue';
import type { Ref } from 'vue';
import { copyToClipBoard } from './utils';
import { alerts } from './alert';
import { Alert } from './entities/Alert';

export const personalMail: string = 'contact@lamatycassandre.me';

// Form
export const name: Ref<string> = ref('');
export const email: Ref<string> = ref('');
export const object: Ref<'info' | 'work' | 'other'> = ref('info');
export const customObject: Ref<string> = ref('');
export const message: Ref<string> = ref('');

export function copyMailToClipboard(): void {
    copyToClipBoard(personalMail);

    alerts.push(
        new Alert('Mail successfully copied to clipboard !', 'success', "You can now paste it anywhere you'd like")
    );
}
