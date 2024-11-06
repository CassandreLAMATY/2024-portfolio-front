export class Alert {
    public title: string;
    public content: string | null;
    public icon: string[];
    public type: 'info' | 'success' | 'warning' | 'danger';

    constructor(title: string, type: 'info' | 'success' | 'warning' | 'danger', content?: string) {
        this.title = title;
        this.type = type;

        if (type === 'success') this.icon = ['fas', 'circle-check'];
        else if (type === 'warning') this.icon = ['fas', 'triangle-exclamation'];
        else if (type === 'danger') this.icon = ['fas', 'skull-crossbones'];
        else this.icon = ['fas', 'circle-info'];

        if (content) this.content = content;
        else this.content = null;
    }
}
