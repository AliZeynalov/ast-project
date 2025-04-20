//todo: add unit tests

/**
 * Collection of functions for the expression evaluator
 */

/**
 * Refactors - strict equality check introduced
 * 
 **/
export function equals(a, b) {
    return a === b;
}

/**
 * Returns the logical NOT of a boolean value
 * @param {boolean} value - The boolean value to negate
 * @returns {boolean} - The negated value
 * @throws {Error} - If the value is not a boolean
 */
export function not(value) {
    if (typeof value !== 'boolean') {
        throw new Error('not function requires boolean parameter');
    }
    return !value;
}

/**
 * Adds two numbers together
 * Refactors - 
 * @param {number} a - First number
 * @param {number} b - Second number
 * @returns {number} - The sum of the two numbers
 * @throws {Error} - If either parameter is not a number
 */
export function add(a, b) {
    if (typeof a !== 'number' || typeof b !== 'number') {
        throw new Error('add function requires number parameters');
    }
    return a + b;
}