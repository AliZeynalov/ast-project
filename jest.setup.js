// Import jest for ES modules
import { jest } from '@jest/globals';

// Mock fetch globally
global.fetch = jest.fn(); 