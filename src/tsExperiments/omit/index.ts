// Exclude address with omit
interface Person {
    name: string;
    age: number;
    address: string;
}
export type PersonWithoutAddress = Omit<Person, 'address'>;