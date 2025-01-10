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
        this.createComponentFromTemplate();
    }

    private createComponentFromTemplate(): void {
        const wordList = this.getList();
        const wordContainer = document.getElementById('wordContainer');
        if (wordList && wordList.length > 0) {
            const wordTemplate = document.getElementById('wordTemplate') as HTMLTemplateElement;
            wordList.forEach((word) => {
                const wordClone = wordTemplate.content.cloneNode(true) as HTMLElement;
                const wordDiv = wordClone.querySelector('#word') as HTMLElement;
                wordDiv.textContent = word;
                wordContainer?.appendChild(wordClone);
            });
        }
        else {
            const errTemplate = document.getElementById('errorTemplate') as HTMLTemplateElement;
            const clone = errTemplate.content.cloneNode(true);
            wordContainer?.appendChild(clone);
        }
    }

    

    private getList(): string[] {
        const words: string[] = ['do', 
                                 'be',
                                 'they',
                                 'can',
                                 'cat',
                                 'mouse',
                                 'will',
                                 'cow',
                                 'when',
                                 'bus',
                                 'him',
                                 'for',
                                 'lot',
                                 'her',
                                 'or',
                                 'not'
                                ];
        return words;
    }

}