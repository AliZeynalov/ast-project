// Export the core functionality
export * from './evaluator.js';
export * from './functions.js';

// Re-export specific types for easier access
import { Evaluator, Expression, LiteralExpression, FunctionExpression } from './evaluator.js';
export { Evaluator, Expression, LiteralExpression, FunctionExpression }; 