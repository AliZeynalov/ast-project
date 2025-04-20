import { Evaluator } from "../src/evaluator";

let evaluator;

describe("Evaluator", () => {
    beforeEach(() => {
        evaluator = new Evaluator();
    });

    afterAll(() => {
        evaluator = null;
    });

    it("evaluates a literal expression", function() {
        expect(evaluator.evaluate({ type: "literal", value: "true" })).toBe("true");
        expect(evaluator.evaluate({ type: "literal", value: 42 })).toBe(42);
        expect(evaluator.evaluate({ type: "literal", value: false })).toBe(false);
    });

    it("evaluates an add function expression", () => {
        expect(evaluator.evaluate({ 
            type: "function", 
            name: "add", 
            parameters: [
                { type: "literal", value: 0.3 }, 
                { type: "literal", value: 0.6 }
            ] 
        })).toBeCloseTo(0.9);
    });

    it("evaluates a nested function expression", () => {
        expect(evaluator.evaluate({
            type: "function",
            name: "add",
            parameters: [
                { type: "literal", value: 1 },
                { 
                    type: "function", 
                    name: "add", 
                    parameters: [
                        { type: "literal", value: 2 },
                        { type: "literal", value: 3 }
                    ]
                }
            ]
        })).toBe(6);
    });

    it("evaluates an equals function expression", () => {
        expect(evaluator.evaluate({
            type: "function",
            name: "equals",
            parameters: [
                { type: "literal", value: 5 },
                { type: "literal", value: 5 }
            ]
        })).toBe(true);

        expect(evaluator.evaluate({
            type: "function",
            name: "equals",
            parameters: [
                { type: "literal", value: 5 },
                { type: "literal", value: 10 }
            ]
        })).toBe(false);
    });

    it("evaluates a not function expression", () => {
        expect(evaluator.evaluate({
            type: "function",
            name: "not",
            parameters: [
                { type: "literal", value: true }
            ]
        })).toBe(false);

        expect(evaluator.evaluate({
            type: "function",
            name: "not",
            parameters: [
                { type: "function", name: "equals", parameters: [
                    { type: "literal", value: 1 },
                    { type: "literal", value: 2 }
                ]}
            ]
        })).toBe(true);
    });

    it("throws an error for an invalid expression", () => {
        expect(() => evaluator.evaluate({ type: "" })).toThrow();
    });

    it("throws an error for an invalid function expression", () => {
        expect(() => evaluator.evaluate({ type: "function", name: "toString", parameters: [] })).toThrow("Unknown function");
    });
});