export function copyToClipBoard(s: string): void {
    navigator.clipboard.writeText(s);
}
