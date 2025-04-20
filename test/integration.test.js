import { Evaluator } from '../src/evaluator.js';
import { jest } from '@jest/globals';

// Mock the global fetch function
global.fetch = jest.fn();

describe('Integration tests', () => {
  let evaluator;

  beforeEach(() => {
    evaluator = new Evaluator();
    jest.clearAllMocks();
  });

  it('should evaluate contains(fetchGet("https://google.com"), "Bing")', async () => {
    // Arrange
    const googleContent = '<html><body>Google search engine</body></html>';
    fetch.mockResolvedValueOnce({
      ok: true,
      text: jest.fn().mockResolvedValueOnce(googleContent)
    });

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
              "value": "https://google.com"
            }
          ]
        },
        {
          "type": "literal",
          "value": "Bing"
        }
      ]
    };

    // Act
    const result = await evaluator.evaluate(expression);

    // Assert
    expect(fetch).toHaveBeenCalledWith('https://google.com');
    expect(result).toBe(false); // Google content doesn't contain "Bing"
  });

  it('should evaluate contains(fetchGet("https://example.com"), "Example")', async () => {
    // Arrange
    const exampleContent = '<html><body>Example Domain</body></html>';
    fetch.mockResolvedValueOnce({
      ok: true,
      text: jest.fn().mockResolvedValueOnce(exampleContent)
    });

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
          "value": "Example"
        }
      ]
    };

    // Act
    const result = await evaluator.evaluate(expression);

    // Assert
    expect(fetch).toHaveBeenCalledWith('https://example.com');
    expect(result).toBe(true); // Example content contains "Example"
  });
}); 