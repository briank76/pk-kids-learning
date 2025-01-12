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
        this.addEventListener();
    }

    private createComponentFromTemplate(): void {
        const wordList = this.getList();
        const wordContainer = document.getElementById('wordContainer');
        const wordTemplate = document.getElementById('wordTemplate') as HTMLTemplateElement;
        if (wordList && wordList.length > 0) {
            wordList.forEach((word) => {
                const wordClone = wordTemplate.content.cloneNode(true) as HTMLElement;
                const wordDiv = wordClone.querySelector('#word') as HTMLElement;
                const button = wordClone.querySelector('#btn') as HTMLElement;
                wordDiv.textContent = word;
                wordDiv.id = 'word-' + word;
                button.id = word;
                wordContainer?.appendChild(wordClone);
            });
        }
        else {
            const errTemplate = document.getElementById('errorTemplate') as HTMLTemplateElement;
            const clone = errTemplate.content.cloneNode(true);
            wordContainer?.appendChild(clone);
        }
    }

    private addEventListener() {
        const btnList = document.getElementsByClassName('btn');
        if (btnList) {
            Array.from(btnList).forEach((btn) => {
                btn.addEventListener('click', (e) => {
                    const btn = e.target as HTMLButtonElement;
                    const wordDivId = 'word-' + btn.id;
                    const wordDiv = document.getElementById(wordDivId);
                    if (btn.textContent?.toLowerCase() === 'hide') {
                        btn.textContent = 'Show';
                        wordDiv?.classList.add('hide');
                    } else {
                        btn.textContent = 'Hide';
                        wordDiv?.classList.remove('hide');
                    }
                });
            });
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