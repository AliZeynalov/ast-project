import { Evaluator } from "../src/evaluator.js";

let evaluator;

describe("Evaluator", () => {
    beforeEach(() => {
        evaluator = new Evaluator();
    });

    afterAll(() => {
        evaluator = null;
    });

    it("evaluates a literal expression", async () => {
        expect(await evaluator.evaluate({ type: "literal", value: "true" })).toBe("true");
        expect(await evaluator.evaluate({ type: "literal", value: 42 })).toBe(42);
        expect(await evaluator.evaluate({ type: "literal", value: false })).toBe(false);
    });

    it("evaluates an add function expression", async () => {
        expect(await evaluator.evaluate({ 
            type: "function", 
            name: "add", 
            parameters: [
                { type: "literal", value: 0.3 }, 
                { type: "literal", value: 0.6 }
            ] 
        })).toBeCloseTo(0.9);
    });

    it("evaluates a nested function expression", async () => {
        expect(await evaluator.evaluate({
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

    it("evaluates an equals function expression", async () => {
        expect(await evaluator.evaluate({
            type: "function",
            name: "equals",
            parameters: [
                { type: "literal", value: 5 },
                { type: "literal", value: 5 }
            ]
        })).toBe(true);

        expect(await evaluator.evaluate({
            type: "function",
            name: "equals",
            parameters: [
                { type: "literal", value: 5 },
                { type: "literal", value: 10 }
            ]
        })).toBe(false);
    });

    it("evaluates a not function expression", async () => {
        expect(await evaluator.evaluate({
            type: "function",
            name: "not",
            parameters: [
                { type: "literal", value: true }
            ]
        })).toBe(false);

        expect(await evaluator.evaluate({
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

    it("throws an error for an invalid expression", async () => {
        await expect(evaluator.evaluate({ type: "" })).rejects.toThrow();
    });

    it("throws an error for not function with non-boolean parameter", async () => {
        await expect(evaluator.evaluate({ 
            type: "function", 
            name: "not", 
            parameters: [{ type: "literal", value: 1 }] 
        })).rejects.toThrow("not function requires boolean parameter");
    });

    it("throws an error for an invalid function expression", async () => {
        await expect(evaluator.evaluate({ 
            type: "function", 
            name: "toString", 
            parameters: [] 
        })).rejects.toThrow("Unknown function");
    });
});