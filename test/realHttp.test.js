import { Evaluator } from '../src/evaluator';

// This test file makes REAL HTTP calls - only run when needed
// To run these tests specifically: npm test -- test/realHttp.test.js

describe('Real HTTP calls tests', () => {
  let evaluator;
  
  // This flag allows us to skip these tests in CI environments
  const SKIP_REAL_HTTP_TESTS = process.env.SKIP_REAL_HTTP_TESTS === 'true';
  
  beforeEach(() => {
    evaluator = new Evaluator();
    
    // Restore the real fetch implementation instead of the mock
    if (global.fetch.mockRestore) {
      global.fetch.mockRestore();
    }
  });
  
  // Use test.skip conditionally to skip these tests when needed
  const conditionalTest = SKIP_REAL_HTTP_TESTS ? test.skip : test;
  
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
    
    // This will make a real HTTP call to example.com
    const result = await evaluator.evaluate(expression);
    
    // example.com should contain "Example Domain"
    expect(result).toBe(true);
  }, 10000); // Increase timeout to allow for network latency
  
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
    
    // This should fail with a network error
    await expect(evaluator.evaluate(expression)).rejects.toThrow();
  }, 10000); // Increase timeout
}); 