/**
 * Checks if two values are strictly equal
 * @param a - First value to compare
 * @param b - Second value to compare
 * @returns True if values are strictly equal, false otherwise
 */
export declare function equals(a: any, b: any): boolean;
/**
 * Returns the logical NOT of a boolean value
 * @param value - The boolean value to negate
 * @returns The negated value
 * @throws Error if the value is not a boolean
 */
export declare function not(value: boolean): boolean;
/**
 * Adds two numbers together
 * @param a - First number
 * @param b - Second number
 * @returns The sum of the two numbers
 * @throws Error if either parameter is not a number
 */
export declare function add(a: number, b: number): number;
/**
 * Retrieves content from a URL using a GET request
 * @param url - The URL to fetch content from
 * @returns A promise that resolves to the content of the URL as a string
 * @throws Error if the URL is not a string or if the fetch fails
 */
export declare function fetchGet(url: string): Promise<string>;
/**
 * Checks if the first string contains the second string
 * @param source - The source string to search in
 * @param keyword - The string to search for
 * @returns True if the source contains the search string, false otherwise
 * @throws Error if either parameter is not a string
 */
export declare function contains(source: string, keyword: string): boolean;
/**
 * Multiplies two numbers together
 * @param a - First number
 * @param b - Second number
 * @returns The product of the two numbers
 * @throws Error if either parameter is not a number
 */
export declare function multiply(a: number, b: number): number;
