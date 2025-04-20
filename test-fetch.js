// Simple script to test fetch outside Jest -- will be removed later, once assignment is ready.

import { contains, fetchGet } from "./src/functions.js";

async function testContains() {
    console.log('Starting contains test...');
    try {
        const content = await fetchGet("https://example.com");
        const response = await contains(content, "domain");
        console.log(`CONTENT: `, content);
        console.log(`Does "https://example.com" contain 'domain'? `, response);
        return response;
    } catch (error) {
        console.error('Contains test failed:', error);
        return `Contains test failed: ${error.message}`;
    }
}


testContains()
  .then(result => console.log(result))
  .catch(error => console.error('Unexpected error:', error));