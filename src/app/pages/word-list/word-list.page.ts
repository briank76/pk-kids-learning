import { PageBase } from "../../page.base";
import { IPageComponent } from "../../page.interface";
import * as htmlContent from 'bundle-text:./word-list.page.html';
import * as scssContent from 'bundle-text:./word-list.page.scss';

export class WordListPage extends PageBase implements IPageComponent
{
    constructor() {
        super();
    }
    
    render(app: HTMLDivElement): void {
        this.addHtml(app, htmlContent);
        this.addStyles(app, scssContent);
    }

}