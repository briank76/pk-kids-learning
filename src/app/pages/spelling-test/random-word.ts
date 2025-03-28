export class RandomWord {
    private wordList: string[];
    private initialWordCount: number;
    private currentWord: string;

    constructor(words: string[]) {
        this.wordList = words;
        this.initialWordCount = words.length;
        this.currentWord = '';
    }

    public get initialCount(): number {
        return this.initialWordCount;
    }

    public get completedCount(): number {
        return this.initialWordCount - this.wordList.length;
    }

    public get currentSelectedWord(): string {
        return this.currentWord;
    }

    public getRandomWord(): string {
        if (this.wordList.length > 0) {
            const randomIndex = Math.floor(Math.random() * this.wordList.length);
            const selectedWord = this.wordList[randomIndex];
            this.wordList.splice(randomIndex, 1);
            this.currentWord = selectedWord;
            return selectedWord;
        } else {
            this.currentWord = '';
            return '';
        }
    }
}