import { PageBase } from "../../page.base";
import { IPageComponent } from "../../page.interface";
import * as htmlContent from 'bundle-text:./math.page.html';
import * as scssContent from 'bundle-text:./math.page.scss';


export class MathPage extends PageBase implements IPageComponent {

    constructor() {
        super();
    }

    render(app: HTMLDivElement): void {
        this.addHtml(app, htmlContent);
        this.addStyles(app, scssContent);
    }
}