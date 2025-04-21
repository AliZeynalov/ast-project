import { add, equals, not, fetchGet, contains } from "./functions.js";

/**
 * Types for AST Expression
 */
export type LiteralExpression = {
    type: "literal";
    value: string | number | boolean | null | Date | Array<any>;
};

export type FunctionExpression = {
    type: "function";
    name: string;
    parameters: Expression[];
};

export type Expression = LiteralExpression | FunctionExpression;

/**
 * Evaluator class that evaluates expression ASTs
 */
export class Evaluator {
    /**
     * Evaluates an expression AST
     * @param expression - The expression to evaluate
     * @returns The result of the evaluation
     * @throws Error if the expression is invalid or contains an unknown function
     */
    async evaluate(expression: Expression): Promise<any> {
        if (!expression || !expression.type) {
            throw new Error("Invalid expression: missing type");
        }

        if (expression.type === "literal") {
            return expression.value;
        } else if (expression.type === "function") {
            if (!expression.name) {
                throw new Error("Invalid function expression: missing name");
            }

            if (!Array.isArray(expression.parameters)) {
                throw new Error("Invalid function expression: parameters must be an array");
            }

            switch (expression.name) {
                case "add": {
                    const param1 = await this.evaluate(expression.parameters[0]);
                    const param2 = await this.evaluate(expression.parameters[1]);
                    return add(param1, param2);
                }
                case "equals": {
                    const param1 = await this.evaluate(expression.parameters[0]);
                    const param2 = await this.evaluate(expression.parameters[1]);
                    return equals(param1, param2);
                }
                case "not": {
                    const param = await this.evaluate(expression.parameters[0]);
                    return not(param);
                }
                case "fetchGet": {
                    const url = await this.evaluate(expression.parameters[0]);
                    return await fetchGet(url);
                }
                case "contains": {
                    const source = await this.evaluate(expression.parameters[0]);
                    const search = await this.evaluate(expression.parameters[1]);
                    return contains(source, search);
                }
                default:
                    throw new Error(`Unknown function: ${expression.name}`);
            }
        } else {
            throw new Error(`Unknown expression type: ${(expression as any).type}`);
        }
    }
} 