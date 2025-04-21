import { Evaluator } from '../src/evaluator.js';
import nodeFetch from 'node-fetch';

// This test file makes REAL HTTP calls - only run when needed
// To run these tests specifically: npm run test:real

describe('Real HTTP calls tests', () => {
  let evaluator;
  let originalFetch;
  
  // This flag allows us to skip these tests in CI environments
  const SKIP_REAL_HTTP_TESTS = process.env.SKIP_REAL_HTTP_TESTS === 'true';
  
  beforeAll(() => {
    // Store the original mock fetch
    originalFetch = global.fetch;
    
    // Replace global.fetch with the real node-fetch, becasue we're making a real HTTP call here.
    global.fetch = nodeFetch;
  });
  
  afterAll(() => {
    // Restore the original fetch
    global.fetch = originalFetch;
  });
  
  beforeEach(() => {
    evaluator = new Evaluator();
  });
  
  const conditionalTest = SKIP_REAL_HTTP_TESTS ? test.skip : test;
  
  conditionalTest('direct fetch should work with example.com', async () => {
    const response = await fetch('https://example.com');
    expect(response.ok).toBe(true);
    
    const text = await response.text();
    expect(text).toContain('Example Domain');
  }, 10000);
  
  conditionalTest('should evaluate contains with real HTTP call to example.com', async () => {
    const expression = {
      "type": "function",
      "name": "contains",
      "parameters": [
        {
          "type": "function",
          "name": "fetchGet",
          "parameters": [
            {
              "type": "literal",
              "value": "https://example.com"
            }
          ]
        },
        {
          "type": "literal",
          "value": "Example Domain"
        }
      ]
    };
    
    const result = await evaluator.evaluate(expression);
    console.log("result", result);
    // example.com should contain "Example Domain"
    expect(result).toBe(true);
  }, 15000); // In case of need, increase timeout
  
  conditionalTest('should handle errors with real HTTP calls', async () => {
    const expression = {
      "type": "function",
      "name": "fetchGet",
      "parameters": [
        {
          "type": "literal",
          "value": "https://this-domain-does-not-exist-12345.com"
        }
      ]
    };
    
    await expect(evaluator.evaluate(expression)).rejects.toThrow();
  }, 15000); // Increase timeout
}); 