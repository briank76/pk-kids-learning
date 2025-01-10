export class PageBase
{
    constructor() {}

    public addHtml(app: HTMLDivElement, pageHtml: string) {
        const content = this.parseHtml(pageHtml);
        content.body.childNodes.forEach((x) => {
            app.appendChild(x);
        });
        console.log('page added');
    }

    public addStyles(app: HTMLDivElement, scssData: string) {
        const styles = document.createElement('style');
        styles.textContent = scssData;
        app.append(styles);
    }

    public getTemplateById(id: string, doc: Document): DocumentFragment {
        const template = doc.getElementById(id) as HTMLTemplateElement;
        return template.content;
    }

    public parseHtml(pageHtml: string): Document {
        const content = new DOMParser().parseFromString(pageHtml, 'text/html');
        console.log(content);
        return content;
    }
}