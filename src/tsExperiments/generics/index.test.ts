import { createPair, NamedValue } from ".";

describe('Create Pair', () => {
    it('should create a pair and return as an array', () => {
        let result = createPair<string, number>('Age', 20);

        expect(result[0]).toBe('Age');
        expect(result[1]).toBe(20);
    });
});

describe('Name Value', () => {
    it('should create a pair and return as an array', () => {
        const value = new NamedValue<number>('testNumber');
        value.setValue(20);
        expect(value.getValue()).toBe(20);
        expect(value.toString()).toBe('20');
    });
});