import { HandleError } from './utils/HandleError';

export function copyToClipboard(s: string): void {
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(s).catch((e: unknown) => {
            throw new Error('An error occured while copying email address:\n' + HandleError.ensureError(e));
        });
    } else {
        fallbackCopyTextToClipboard(s);
    }
}

function fallbackCopyTextToClipboard(s: string): void {
    const textArea = document.createElement('textarea');
    textArea.value = s;

    textArea.style.position = 'fixed';
    textArea.style.top = '0';
    textArea.style.left = '0';
    textArea.style.width = '1px';
    textArea.style.height = '1px';
    textArea.style.opacity = '0';

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
        document.execCommand('copy');
    } catch (e: unknown) {
        throw new Error(HandleError.ensureError(e).message);
    }

    document.body.removeChild(textArea);
}
