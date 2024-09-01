// Create key value pairs with string and number
export function createPair<S, T>(v1: S, v2: T): [S, T] {
    return [v1, v2];
}

// Named Value
export class NamedValue<T> {
    private _value: T | undefined;

    constructor(private name: string) { }

    public setValue(value: T) {
        this._value = value;
    }

    public getValue(): T | undefined {
        return this._value;
    }

    public toString(): string {
        return `${this._value}`;
    }
}

// Merge Two Object
type Merge<T, U> = T & U;
export function mergeObjects<T, U>(obj1: T, obj2: U): Merge<T, U> {
    return { ...obj1, ...obj2 }
}

// Dynamic value and data type
export function DynamicDataTypeValue<Type>(arg: Type): Type {
    return arg;
}