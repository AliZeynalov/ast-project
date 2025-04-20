import { fetchGet } from '../src/functions.js';
import { jest } from '@jest/globals';

// Mock the global fetch function
global.fetch = jest.fn();

describe('fetchGet function', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  it('should fetch data from a URL', async () => {
    const mockText = 'Fetched content';
    fetch.mockResolvedValueOnce({
      ok: true,
      text: jest.fn().mockResolvedValueOnce(mockText)
    });

    const result = await fetchGet('https://example.com');

    expect(fetch).toHaveBeenCalledWith('https://example.com');
    expect(result).toBe(mockText);
  });

  it('should throw an error if URL is not a string', async () => {
    await expect(fetchGet(123)).rejects.toThrow('fetchGet function requires a string parameter');
    await expect(fetchGet(null)).rejects.toThrow('fetchGet function requires a string parameter');
    await expect(fetchGet(undefined)).rejects.toThrow('fetchGet function requires a string parameter');
  });

  it('should throw an error if the fetch fails', async () => {
    fetch.mockRejectedValueOnce(new Error('Network error'));

    await expect(fetchGet('https://example.com')).rejects.toThrow('Failed to fetch from https://example.com');
  });

  it('should throw an error if the response is not ok', async () => {
    // Arrange
    fetch.mockResolvedValueOnce({
      ok: false,
      status: 404
    });

    await expect(fetchGet('https://example.com')).rejects.toThrow('HTTP error! status: 404');
  });
}); 