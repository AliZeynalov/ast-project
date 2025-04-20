//todo: add unit tests

/**
 * CHANGES
 * strict type checking
 */
export function equals(a, b) {
    return a === b;
}

export function not(value) {
    if (typeof value !== 'boolean') {
        throw new Error('not function requires boolean parameter');
    }
    return !value;
}

export function add(a, b) {
    if (typeof a !== 'number' || typeof b !== 'number') {
        throw new Error('add function requires number parameters');
    }
    return a + b;
}