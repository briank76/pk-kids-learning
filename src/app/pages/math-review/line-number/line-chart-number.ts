import { MathNumbersModel } from "../../../../models/math-numbers.model";
import { ChartNumberModel } from "./chart-number.model";

export class LineChartNumbers {
    private lineNumbers: ChartNumberModel[];
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private mathModel: MathNumbersModel;
    private readonly defaultRadius = 20;
    private readonly defaultxOffset = 90;
    private readonly defaultxInitalOffset = 35;
    private readonly defaultCanvasWidth = 1000;
    private readonly defaultCanvasHeight = 150;
    private readonly defaultLineArc = 45;
    private readonly defaultChartNumberFontSize = 20;
    private readonly minSize = 500;
    private radius: number;
    private xOffset: number;
    private xInitalOffset: number;
    private lineArc: number;
    private chartNumberFontSize: number;
    
    constructor(canvasId: string) {
        this.canvas = document.getElementById(canvasId) as HTMLCanvasElement;
        this.ctx = this.canvas.getContext('2d')!;
        this.lineNumbers = [];
        this.setCanvasSize();
        this.addEventListeners();
    }

    // set the canvas size based on the screen size
    private setCanvasSize(): void {
        const currentWidth = document.documentElement.clientWidth;
        if (currentWidth < 1000) {
            const floorSize = Math.floor(currentWidth / 100) * 100;
            // hide canvas if screen is too small
            if (floorSize >= this.minSize) {
                this.canvas.height = this.defaultCanvasHeight;
                const resizePercent = floorSize / this.defaultCanvasWidth;
                this.radius = this.defaultRadius * resizePercent;
                this.xOffset = this.defaultxOffset * resizePercent;
                this.xInitalOffset = this.defaultxInitalOffset * resizePercent;
                this.chartNumberFontSize = this.defaultChartNumberFontSize;
                this.lineArc = this.defaultLineArc * resizePercent;
                this.canvas.width = floorSize;
            } else {
                this.canvas.width = 0;
                this.canvas.height = 0;
            }
        } else {
            this.radius = this.defaultRadius;
            this.xOffset = this.defaultxOffset;
            this.xInitalOffset = this.defaultxInitalOffset;
            this.lineArc = this.defaultLineArc;
            this.chartNumberFontSize = this.defaultChartNumberFontSize;
            this.canvas.width = this.defaultCanvasWidth;
            this.canvas.height = this.defaultCanvasHeight;
        }
    }

    // add event listeners to the canvas
    private addEventListeners(): void {
        window.addEventListener('resize', () => {
            this.setCanvasSize();
            this.draw();
        });

        this.canvas.addEventListener('click', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            let unclickAllNumbersAfter = false;
            
            // reverse array to process subtraction problems in for loop
            if (this.mathModel.function === 'Subtract') {
                this.lineNumbers = this.lineNumbers.reverse();
            }
            // process each line number to see if click is valid
            for (let i = 0; i < this.lineNumbers.length; i++) {
                const ln = this.lineNumbers[i];
                if (ln.chartNumber === this.mathModel.topNumber) {
                    // ignore the top number
                    continue;
                }
                if (x >= ln.xPosition - this.radius && x <= ln.xPosition + this.radius && 
                    y >= ln.yPosition - this.radius && y <= ln.yPosition + this.radius) {
                    ln.isClicked = !ln.isClicked;
                    unclickAllNumbersAfter = !ln.isClicked;
                } else if (unclickAllNumbersAfter) {
                    // unclick's all numbers after the clicked number
                    ln.isClicked = false;
                } else if (!ln.isClicked) {
                    // this prevents clicking in a non-linear fashion
                    break;
                }
            }
            // reverse array back to original order to draw
            if (this.mathModel.function === 'Subtract') {
                this.lineNumbers = this.lineNumbers.reverse();
            }
            this.draw();
        });
    }

    // draw the line chart numbers
    private draw(): void {
        // clear and draw background
        this.ctx.save();
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = 'rgba(0, 0, 0, 1)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.restore();

        // draw line
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.moveTo(5, this.canvas.height / 2.5);
        this.ctx.lineTo(this.canvas.width - 5, this.canvas.height / 2.5);
        this.ctx.lineWidth = 5;
        this.ctx.strokeStyle = "#fff";
        this.ctx.stroke();
        this.ctx.restore();
        
        // draw numbers
        let currentOffset = this.xInitalOffset;
        this.ctx.save();
        this.lineNumbers.forEach((ln) => {
            // draw line
            this.ctx.beginPath();
            this.ctx.moveTo(currentOffset, this.canvas.height / 1.75);
            this.ctx.lineTo(currentOffset, this.canvas.height/ 1.75 - 50);
            this.ctx.moveTo(currentOffset, this.canvas.height / 1.75);
            this.ctx.lineWidth = 2;
            this.ctx.strokeStyle = "#fff";
            this.ctx.stroke();
            
            // draw circle
            this.ctx.beginPath();
            this.ctx.arc(currentOffset, this.canvas.height / 1.4, this.defaultRadius, 0, Math.PI * 2, false);
            if (this.mathModel.topNumber === ln.chartNumber) {
                this.ctx.strokeStyle = 'orange';
            } else if (ln.isClicked) {
                this.ctx.strokeStyle = ln.isValid ? '#00ff00' : '#ff0000';
            } else {
                this.ctx.strokeStyle = "yellow";
            }
            this.ctx.stroke();

            // save position
            ln.xPosition = currentOffset;
            ln.yPosition = this.canvas.height / 1.4;

            // draw number
            // Calculate text metrics for centering the number inside the circle
            this.ctx.font = `${this.chartNumberFontSize}px Arial`;
            const textMetrics = this.ctx.measureText(ln.chartNumber.toString());
            const textWidth = textMetrics.width;
            const textHeight = textMetrics.fontBoundingBoxAscent;
            // Draw the number inside the circle
            this.ctx.fillStyle = '#fff'; 
            this.ctx.fillText(ln.chartNumber.toString(), currentOffset - (textWidth / 2), (this.canvas.height / 1.4) + (textHeight / 2));

            // draw line arc
            if (this.mathModel.topNumber !== ln.chartNumber && ln.isClicked) {
                this.ctx.beginPath();
                const offset = this.mathModel.function === 'Add' ? 
                                currentOffset - this.xInitalOffset - (this.radius / 2) :
                                currentOffset + this.xInitalOffset + (this.radius / 2);
                this.ctx.arc(offset, this.canvas.height / 2.5, this.lineArc, 0, Math.PI, true);
                this.ctx.strokeStyle = ln.isValid ? '#00ff00' : '#ff0000';
                this.ctx.lineWidth = 3;
                this.ctx.stroke();
            }

            // update offset
            currentOffset += this.xOffset;
        });
        this.ctx.restore();
    }


    private initLineNumbers(model: MathNumbersModel): void {
        this.lineNumbers = [];
        if (model.function === 'Add') {
            for(let i = this.mathModel.topNumber; i <= this.mathModel.topNumber + 10; i++) {
                if (i <= this.mathModel.total) {
                    this.lineNumbers.push({
                        chartNumber: i, isValid: true,
                        isClicked: false,
                        xPosition: 0,
                        yPosition: 0
                    });
                } else {
                    this.lineNumbers.push({
                        chartNumber: i, isValid: false,
                        isClicked: false,
                        xPosition: 0,
                        yPosition: 0
                    });
                }
            }
        } else {
            for(let i = this.mathModel.topNumber - 10; i <= this.mathModel.topNumber; i++) {
                if (i >= this.mathModel.total) {
                    this.lineNumbers.push({
                        chartNumber: i, isValid: true,
                        isClicked: false,
                        xPosition: 0,
                        yPosition: 0
                    });
                } else {
                    this.lineNumbers.push({
                        chartNumber: i, isValid: false,
                        isClicked: false,
                        xPosition: 0,
                        yPosition: 0
                    });
                }
            }
        }
    }

    public update(mathModel: MathNumbersModel): void {
        this.mathModel = mathModel;
        this.initLineNumbers(mathModel);
        this.draw();
    }
}
