import { PageBase } from "../../page.base";
import { IPageComponent } from "../../page.interface";
import { menuDisplayService } from "../../services/menu-display.service";
import * as htmlContent from 'bundle-text:./spelling-test.html';
import * as scssContent from 'bundle-text:./spelling-test.scss';
import { RandomWord } from "./random-word";

export class SpellingTest extends PageBase implements IPageComponent {
    private randomWord: RandomWord;

    constructor() {
        super();
        menuDisplayService.getMenuState().subscribe((menuDisplayed) => { 
            console.log('hide menu');
            if (menuDisplayed) {
                document.getElementById('cardContainer')?.classList.add('st-container__card--disabled');
            } else {
                document.getElementById('cardContainer')?.classList.remove('st-container__card--disabled');
            }
        });
    }

    render(app: HTMLDivElement): void {
        this.addHtml(app, htmlContent);
        this.addStyles(app, scssContent);
        this.addEventListener();
        this.initializeList();
    }

    private initializeList(): void {
        const wordList = this.getList();
        this.randomWord = new RandomWord(wordList);
    }

    private addEventListener(): void {
        document.getElementById('btnFlipCard')?.addEventListener('click', () => {
            document.getElementById('stCard')?.classList.toggle('rotate-left');
        });

        document.getElementById('startTest')?.addEventListener('click', () => {
            document.getElementById('startTest')?.classList.toggle('hide');
            document.getElementById('spellingTest')?.classList.toggle('hide');
            this.initializeList();
            this.setWord();
        });

        document.getElementById('btnHearWord')?.addEventListener('click', () => {
            this.playWord();
        });

        document.getElementById('btnNextWord')?.addEventListener('click', () => {
            document.getElementById('stCard')?.classList.remove('rotate-left');
            this.setWord();
        });
    }
    private setWord(): void {
        const word = this.randomWord.getRandomWord();
        document.getElementById('stWord')!.textContent = word;
        (document.getElementById('stInput') as HTMLInputElement).value = '';
        document.getElementById('lblCount')!.textContent = `${this.randomWord.completedCount} / ${this.randomWord.initialCount}`;
    }

    private playWord(): void {
        const word = this.randomWord.currentSelectedWord;
        if (word) {
            const utterance = new SpeechSynthesisUtterance(word);
            utterance.lang = 'en-US';
            utterance.rate = 0.7;
            utterance.pitch = 1;
            utterance.volume = 1;
            speechSynthesis.speak(utterance);
        }
    }

    private getList(): string[] {
        const words: string[] = ['arm', 
                                 'farm',
                                 'yard',
                                 'art',
                                 'jar',
                                 'bar',
                                 'barn',
                                 'bark',
                                 'card',
                                 'yarn',
                                 'dry',
                                 'pie',
                                 'new',
                                 'once'
                                ];
        return words;
    }
}