import { add, equals, not, fetchGet, contains } from "./functions";

/**
 * Types for expression values in the AST
 */
export type LiteralValue = string | number | boolean | null | Date | LiteralValue[];

/**
 * Base interface for all expressions
 */
export interface Expression {
    type: string;
}

/**
 * Interface for literal expressions
 */
export interface LiteralExpression extends Expression {
    type: "literal";
    value: LiteralValue;
}

/**
 * Interface for function expressions
 */
export interface FunctionExpression extends Expression {
    type: "function";
    name: string;
    parameters: Expression[];
}

/**
 * Type guard to check if an expression is a literal expression
 */
function isLiteralExpression(expression: Expression): expression is LiteralExpression {
    return expression.type === "literal";
}

/**
 * Type guard to check if an expression is a function expression
 */
function isFunctionExpression(expression: Expression): expression is FunctionExpression {
    return expression.type === "function";
}

/**
 * Evaluator class that evaluates expression ASTs
 */
export class Evaluator {
    /**
     * Evaluates an expression AST
     * @param expression - The expression to evaluate
     * @returns The result of the evaluation
     * @throws Error if the expression is invalid
     */
    async evaluate(expression: Expression): Promise<any> {
        if (!expression || !expression.type) {
            throw new Error("Invalid expression: missing type");
        }

        if (isLiteralExpression(expression)) {
            return expression.value;
        } else if (isFunctionExpression(expression)) {
            if (!expression.name) {
                throw new Error("Invalid function expression: missing name");
            }
            if (!Array.isArray(expression.parameters)) {
                throw new Error("Invalid function expression: parameters must be an array");
            }
            if (expression.parameters.length === 0) {
                throw new Error("Function requires at least one parameter");
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
            throw new Error(`Unknown expression type: ${expression.type}`);
        }
    }
} 