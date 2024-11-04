export class Alert {
    public title: string;
    public content: string | null;
    public icon: string[];

    constructor(title: string, icon: string[], content?: string) {
        this.title = title;
        this.icon = icon;

        if (content) this.content = content;
        else this.content = null;
    }
}
