// Export the core functionality
export * from './evaluator';
export * from './functions';

// Re-export specific types for easier access
import { Evaluator, Expression, LiteralExpression, FunctionExpression } from './evaluator';
export { Evaluator, Expression, LiteralExpression, FunctionExpression }; 