// Simple script to test fetch outside Jest -- will be removed later, once assignment is ready.

import { contains, fetchGet } from "./src/functions.js";

async function testFetch() {
  console.log('Starting fetch test...');
  try {
    console.log('Fetching from example.com...');
    const response = await fetch('https://example.com');
    console.log(`Status: ${response.status}`);
    
    const text = await response.text();
    console.log(`Response length: ${text.length} characters`);
    console.log(`Response contains 'Example Domain': ${text.includes('Example Domain')}`);
    console.log(`Response contains 'google': ${text.includes('google')} `);
    return 'Fetch test completed successfully';
  } catch (error) {
    console.error('Fetch error:', error);
    return `Fetch test failed: ${error.message}`;
  }
}

// Run the test
testFetch()
  .then(result => console.log(result))
  .catch(error => console.error('Unexpected error:', error)); 