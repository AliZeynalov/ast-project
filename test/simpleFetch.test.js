// A simple test file that makes a real HTTP call without any mocking setup
import nodeFetch from 'node-fetch';

// This test assumes that Jest's setupFiles is NOT used or doesn't include jest.setup.js

describe('Simple fetch test without mocks', () => {
  // Always use node-fetch for this test
  beforeAll(() => {
    // Store original fetch if it exists
    const originalFetch = global.fetch;
    
    // Replace with node-fetch
    global.fetch = nodeFetch;
    
    // After tests, restore original if there was one
    return () => {
      if (originalFetch) {
        global.fetch = originalFetch;
      }
    };
  });

  it('should fetch data from example.com', async () => {
    // Make a real HTTP call to example.com
    const response = await fetch('https://example.com');
    expect(response.ok).toBe(true);
    
    const text = await response.text();
    expect(text).toContain('Example Domain');
  }, 10000); // Increase timeout for network calls
}); 