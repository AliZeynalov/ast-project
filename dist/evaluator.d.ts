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
 * Evaluator class that evaluates expression ASTs
 */
export declare class Evaluator {
    /**
     * Evaluates an expression AST
     * @param expression - The expression to evaluate
     * @returns The result of the evaluation
     * @throws Error if the expression is invalid
     */
    evaluate(expression: Expression): Promise<any>;
}
