import { MathFunction, MathNumbersModel } from "../../../models/math-numbers.model";
import { PageBase } from "../../page.base";
import { IPageComponent } from "../../page.interface";
import * as htmlContent from 'bundle-text:./math.page.html';
import * as scssContent from 'bundle-text:./math.page.scss';


export class MathPage extends PageBase implements IPageComponent {
    private selectedFunction: MathFunction = "Add"
    private currentQuestion: MathNumbersModel;

    constructor() {
        super();
    }

    render(app: HTMLDivElement): void {
        this.addHtml(app, htmlContent);
        this.addStyles(app, scssContent);
        this.addEventListenerQuestionType();
        this.addEventListenerCheckAnswer();
        this.addEventListenerNextQuestion();
        this.createEquation();
    }

    private addEventListenerQuestionType(): void {
        document.getElementById('mathFunction')?.addEventListener('change', (e) => {
            const func = e.target as HTMLSelectElement;
                console.log(func);
            if (func) {
                this.selectedFunction = func.value as MathFunction;
                this.createEquation();
            } else {
                console.log('error finding mathFunction on page')
            }
        });
    }

    private addEventListenerCheckAnswer(): void {
        document.getElementById('checkAnswer')?.addEventListener('click', () => {
            const input = (document.getElementById('total') as HTMLInputElement).value;
            const msg = document.getElementById('results') as HTMLDivElement;

            if (input && this.currentQuestion && input === this.currentQuestion.total.toString()) {
                msg.textContent = 'Correct';
            } else {
                msg.textContent = 'Please try again'
            }
        });
    }

    private addEventListenerNextQuestion(): void {
        document.getElementById('btnNextMathQuestion')?.addEventListener('click', () => {
            (document.getElementById('total') as HTMLInputElement).value = "";
            const msg = document.getElementById('results') as HTMLDivElement;
            if (msg) {
                msg.textContent = '';
            }
            this.createEquation()
        });
    }

    

    private createEquation(): void {
        const model = this.generateNewMathQuestion();
        console.log(model);
        let sign = '+'
        if (model.function === 'Subtract') {
            sign = '-';   
        }
        model.equation = model.topNumber + ' ' + sign + ' ' + model.bottomNumber + ' = ';
        this.setEquation(model);
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
    }

    // generate number between 0-10
    private createModel(): MathNumbersModel {
        const model = new MathNumbersModel();
        const firstNo = Math.floor(Math.random() * 11); 
        const secondNo = Math.floor(Math.random() * 11); 

        if (firstNo > secondNo) {
            model.topNumber = firstNo;
            model.bottomNumber = secondNo;
        } else {
            model.topNumber = secondNo;
            model.bottomNumber = firstNo;
        }
        return model;
    }
}