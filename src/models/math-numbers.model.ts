export type MathFunction = "Add" | "Subtract" | "Any";

export class MathNumbersModel {
    topNumber: number;
    bottomNumber: number;
    function: MathFunction;
    equation: string;
    total: number;
}
