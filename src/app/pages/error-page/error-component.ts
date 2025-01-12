import { IPageComponent } from "../../page.interface";
import html from 'bundle-text:./error-component.html';
import * as scssData from 'bundle-text:./error-component.scss';


export class ErrorComponent implements IPageComponent {

    public render(app: HTMLDivElement): void {
        const content = this.getHtml(html);
        const styles = document.createElement('style');
        styles.textContent = scssData;
        app.append(styles);
        content.body.childNodes.forEach((x) => {
            app.appendChild(x);
        });
    }

    private getHtml(pageHtml: string): Document {
        const content = new DOMParser().parseFromString(pageHtml, 'text/html');
        return content;
    }
}