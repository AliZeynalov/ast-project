import { add, equals, not } from "./functions"

// todo: refactor and improve.
export class Evaluator {
    evaluate(expression) {
        if (expression.type == "literal") {
            var val = expression.value;
            return val;
        } else {
            switch (expression.name) {
                case "add": {
                    let param1 = this.evaluate(expression.parameters[0]);
                    let param2 = this.evaluate(expression.parameters[1]);
                    return add(param1, param2);
                }
                case "equals": {
                    let param1 = this.evaluate(expression.parameters[0]);
                    let param2 = this.evaluate(expression.parameters[1]);
                    return equals(param1, param2);
                }
                case "not": {
                    let param = this.evaluate(expression.parameters[0]);
                    return not(param);
                }
                default:
                    throw "Unknown function";
            }
        }
    }
}
