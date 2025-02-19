import { MathFunction, MathNumbersModel } from "../../../models/math-numbers.model";
import { PageBase } from "../../page.base";
import { IPageComponent } from "../../page.interface";
import * as htmlContent from 'bundle-text:./math.page.html';
import * as scssContent from 'bundle-text:./math.page.scss';
import { LineChartNumbers } from "./line-number/line-chart-number";


export class MathPage extends PageBase implements IPageComponent {
    private selectedFunction: MathFunction = "Add";
    private currentQuestion: MathNumbersModel;
    private lineChartNumbers: LineChartNumbers;

    constructor() {
        super();
    }

    render(app: HTMLDivElement): void {
        this.addHtml(app, htmlContent);
        this.addStyles(app, scssContent);
        this.addEventListenerQuestionType();
        this.addEventListenerCheckAnswer();
        this.addEventListenerNextQuestion();
        const func = document.getElementById('mathFunction') as HTMLSelectElement;
        if (func) {
            this.selectedFunction = func.value as MathFunction;
        }
        this.lineChartNumbers = new LineChartNumbers('lineChartCanvas');
        this.createEquation();
    }

    private addEventListenerQuestionType(): void {
        document.getElementById('mathFunction')?.addEventListener('change', (e) => {
            const func = e.target as HTMLSelectElement;
            if (func) {
                this.selectedFunction = func.value as MathFunction;
                this.createEquation();
            } else {
                console.log('error finding mathFunction on page');
            }
        });
    }

    private addEventListenerCheckAnswer(): void {
        document.getElementById('total')?.addEventListener('keyup', (e: KeyboardEvent) => {
            if (e.key === 'Enter') {
                this.checkAnswer();
            }
        });

        document.getElementById('checkAnswer')?.addEventListener('click', () => {
            this.checkAnswer();
        });
    }

    private checkAnswer(): void {
        const ans = (document.getElementById('total') as HTMLInputElement).value;
        if (ans && this.currentQuestion && ans === this.currentQuestion.total.toString()) {
            this.setMessage('Correct', true);
        } else {
            this.setMessage('Please try again', false);
        }
    }

    private addEventListenerNextQuestion(): void {
        document.getElementById('btnNextMathQuestion')?.addEventListener('click', () => {
            (document.getElementById('total') as HTMLInputElement).value = "";
            this.setMessage('', true);
            this.createEquation();
        });
    }

    private setMessage(msg: string, success: boolean) {
        const msgDiv = document.getElementById('results') as HTMLDivElement;
        this.clearMessage(msgDiv);
        if (msgDiv && msg) {
            msgDiv.textContent = msg;
            if (success) {
                msgDiv.classList.add('math-container__results--success');
            } else {
                msgDiv.classList.add('math-container__results--failure');
                document.getElementById('total')?.focus();
                (document.getElementById('total') as HTMLInputElement)?.select();
            }
        }
    }

    private clearMessage(msgDiv: HTMLDivElement): void {
        if (msgDiv) {
           msgDiv.classList.remove('math-container__results--success');
           msgDiv.classList.remove('math-container__results--failure');
        }
    }

    private createEquation(): void {
        const model = this.generateNewMathQuestion();
        let sign = '+';
        if (model.function === 'Subtract') {
            sign = '-';   
        }
        model.equation = model.topNumber + ' ' + sign + ' ' + model.bottomNumber + ' = ';
        this.setEquation(model);
        this.lineChartNumbers.update(model);
        
    }

    private generateNewMathQuestion(): MathNumbersModel {
        const model = this.createModel();
        
        if (this.selectedFunction === 'Any') {
            if (this.currentQuestion) {
                model.function = this.currentQuestion.function === 'Add' ? 'Subtract' : 'Add';
            } else {
                model.function = 'Add';
            }
        } else {
            model.function = this.selectedFunction;
        }

        if (model.function === 'Add') {
            model.total = model.topNumber + model.bottomNumber;
        } else {
            model.total = model.topNumber - model.bottomNumber;
        }
        
        return model;
    }

    private setEquation(model: MathNumbersModel): void {
        this.currentQuestion = model;
        const equation = document.getElementById('equation') as HTMLDivElement;
        if (equation) {
            equation.textContent = model.equation;
        }
        const total = document.getElementById('total') as HTMLInputElement;
        if (total) {
            total.value = '';
            total.focus();
        }
        this.setMessage('', false);
    }

    // generate number between 0-10
    private createModel(): MathNumbersModel {
        const model = new MathNumbersModel();
        const firstNo = this.getRandomIntInclusive(4, 10);
        const secondNo = this.getRandomIntInclusive(1, 10);

        if (firstNo > secondNo) {
            model.topNumber = firstNo;
            model.bottomNumber = secondNo;
        } else {
            model.topNumber = secondNo;
            model.bottomNumber = firstNo;
        }
        return model;
    }

    private getRandomIntInclusive(min: number, max: number): number {
        const minCeiled = Math.ceil(min);
        const maxFloored = Math.floor(max);
        return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled); // The maximum is inclusive and the minimum is inclusive
    } 
}
