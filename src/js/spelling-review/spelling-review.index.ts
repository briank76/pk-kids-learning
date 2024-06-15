import { IPageComponent } from "../page.interface";
import html from 'bundle-text:./spelling-review.index.html';

export class SpellingReviewPage implements IPageComponent {
    private readonly defaultSize = 'letter-output-md';
    private currentSize: string;

    constructor() {
        this.currentSize = this.defaultSize;
    }

    public render(app: HTMLDivElement): void {
        const content = this.getHtml();
        content.body.childNodes.forEach((x) => {
            app.appendChild(x);
        });
        this.addEventListeners();
    }

    private getHtml(): Document {
        const content = new DOMParser().parseFromString(html, 'text/html');
        return content;
    }

    private displayButtonClick() {
        const value = this.getLetter();
        this.copyLetter(value);
    }

    private clearButtonClick() {
        const letterInput = this.getLetterInputElement();
        if (letterInput) {
            letterInput.value = '';
            letterInput.focus();
        }
        this.copyLetter();
    }

    private getLetter(): string {
        const letterInput = this.getLetterInputElement();
        let value = '';
        if (letterInput) {
            value = letterInput.value;
        }
        return value;
    }

    private getLetterInputElement(): HTMLInputElement {
        return document.getElementById('letterInput') as HTMLInputElement;
    }

    private letterInputKeyUp(k: KeyboardEvent): void {
        if (k.key === 'Enter') {
            this.displayButtonClick();
        } else if (k.key === 'Escape' || k.key === 'Esc') {
            this.clearButtonClick();
        }
    }

    private setLetterSize(e: Event): void {
        const selectElement = e?.target as HTMLSelectElement;
        if (selectElement) {
            const value = selectElement.value;
            let sizeClass = '';
            if (value) {
                switch(value) {
                    case 'sm' :
                        sizeClass = 'letter-output-sm';
                        break;
                    case 'md' :
                        sizeClass = 'letter-output-md';
                        break;
                    case 'lg' : 
                        sizeClass = 'letter-output-lg';
                        break;
                    case 'xl' :
                        sizeClass = 'letter-output-xl';
                        break;
                    default:
                        console.log('setLetterSize - default selected');
                        sizeClass = 'letter-ouput-md';
                        break;
                }
            }
            const letterOutput = document.getElementById('letterOutput');
            if (letterOutput) {
                letterOutput.classList.remove(this.currentSize);
                letterOutput.classList.add(sizeClass);
                this.currentSize = sizeClass;
            } else {
                console.log('letterOutput not found in DOM');
            }
        }
        else {
            console.log('select element not found');
        }
        
    }

    private addEventListeners() {
        document?.getElementById('btnDisplay')?.addEventListener('click', () => {
            this.displayButtonClick();
        });
    
        document?.getElementById('btnClear')?.addEventListener('click', () => {
            this.clearButtonClick();
        });
    
        document?.getElementById('letterInput')?.addEventListener('keyup', (k) => {
            this.letterInputKeyUp(k);
        });
    
        document?.getElementById('letterOutputSize')?.addEventListener('change', (e) => {
            this.setLetterSize(e);
        });
    }

    private copyLetter(letter: string = ''): void {
        const letterOutput = document.getElementById('letterOutput') as HTMLInputElement;
        if (letterOutput) {
            if (!letter) {
                letter = '&nbsp;'
                letterOutput.innerHTML = letter;
            } else {
                letterOutput.innerText = letter;
            }
        }
    }
}
