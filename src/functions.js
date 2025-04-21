//todo: add unit tests

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

/**
 * Retrieves content from a URL using a GET request
 * @param {string} url - The URL to fetch content from
 * @returns {Promise<string>} - The content of the URL as a string
 * @throws {Error} - If the URL is not a string or if the fetch fails
 */
export async function fetchGet(url) {
    if (typeof url !== 'string') {
        throw new Error('fetchGet function requires a string parameter');
    }
    
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.text();
    } catch (error) {
        throw new Error(`Failed to fetch from ${url}: ${error.message}`);
    }
}

/**
 * Checks if the first string contains the second string
 * @param {string} source - The source string to search in
 * @param {string} search - The string to search for
 * @returns {boolean} - True if the source contains the search string, false otherwise
 * @throws {Error} - If either parameter is not a string.
 */
export function contains(source, keyword) {
    if (typeof source !== 'string' || typeof keyword !== 'string') {
        throw new Error('Contains function requires string parameters', {
            parameter_1_type: typeof source,
            parameter_2_type: typeof keyword
        });
    }
    
    return source.includes(keyword);
}