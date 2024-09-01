import { createPair, mergeObjects, NamedValue, DynamicDataTypeValue } from ".";

describe('Typescript Generics', () => {
    it('should create a pair and return as an array', () => {
        let result = createPair<string, number>('Age', 20);

        expect(result[0]).toBe('Age');
        expect(result[1]).toBe(20);
    });

    it('should create a pair and return as an array', () => {
        const value = new NamedValue<number>('testNumber');
        value.setValue(20);
        expect(value.getValue()).toBe(20);
        expect(value.toString()).toBe('20');
    });

    it('should create a pair and return as an array', () => {
        interface A {
            a: number;
        }
        interface B {
            b: string;
        }
        const objA: A = { a: 1 };
        const objB: B = { b: 'hello' };
        const mergedObj = mergeObjects(objA, objB);

        expect(mergedObj.a).toBe(1);
        expect(mergedObj.b).toBe('hello');
    });

    it('should return dynamic value with data type', () => {
        const a = DynamicDataTypeValue<string>('Hello World!');
        const b = DynamicDataTypeValue<number>(12345);
        const c = DynamicDataTypeValue<object>({ name: 'Mamun' });

        expect(typeof a).toBe('string');
        expect(typeof b).toBe('number');
        expect(typeof c).toBe('object');
    });
});