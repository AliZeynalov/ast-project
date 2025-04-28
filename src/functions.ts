/**
 * Checks if two values are strictly equal
 * @param a - First value to compare
 * @param b - Second value to compare
 * @returns True if values are strictly equal, false otherwise
 */
export function equals(a: any, b: any): boolean {
    return a === b;
}

/**
 * Returns the logical NOT of a boolean value
 * @param value - The boolean value to negate
 * @returns The negated value
 * @throws Error if the value is not a boolean
 */
export function not(value: boolean): boolean {
    if (typeof value !== 'boolean') {
        throw new Error('not function requires boolean parameter');
    }
    return !value;
}

/**
 * Adds two numbers together
 * @param a - First number
 * @param b - Second number
 * @returns The sum of the two numbers
 * @throws Error if either parameter is not a number
 */
export function add(a: number, b: number): number {
    if (typeof a !== 'number' || typeof b !== 'number') {
        throw new Error('add function requires number parameters');
    }
    return a + b;
}

/**
 * Retrieves content from a URL using a GET request
 * @param url - The URL to fetch content from
 * @returns A promise that resolves to the content of the URL as a string
 * @throws Error if the URL is not a string or if the fetch fails
 */
export async function fetchGet(url: string): Promise<string> {
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
        if (error instanceof Error) {
            throw new Error(`Failed to fetch from ${url}: ${error.message}`);
        } else {
            throw new Error(`Failed to fetch from ${url}: Unknown error`);
        }
    }
}

/**
 * Checks if the first string contains the second string
 * @param source - The source string to search in
 * @param keyword - The string to search for
 * @returns True if the source contains the search string, false otherwise
 * @throws Error if either parameter is not a string
 */
export function contains(source: string, keyword: string): boolean {
    if (typeof source !== 'string' || typeof keyword !== 'string') {
        throw new Error('Contains function requires string parameters');
    }
    
    return source.includes(keyword);
}

/**
 * Multiplies two numbers together
 * @param a - First number
 * @param b - Second number
 * @returns The product of the two numbers
 * @throws Error if either parameter is not a number
 */
export function multiply(a: number, b: number): number {
    if (typeof a !== 'number' || typeof b !== 'number') {
        throw new Error('multiply function requires number parameters');
    }
    return a * b;
} 