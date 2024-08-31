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