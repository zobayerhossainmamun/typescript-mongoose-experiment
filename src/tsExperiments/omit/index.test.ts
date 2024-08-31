import { PersonWithoutAddress } from ".";

describe('Exclude address with omit', () => {
    it('Should valid name,age other should undefined', () => {
        const personWithoutAddress: PersonWithoutAddress = {
            name: 'Mamun',
            age: 20
        };

        expect(personWithoutAddress.name).toBe('Mamun');
        expect(personWithoutAddress.age).toBe(20);

        expect((personWithoutAddress as any).address).toBeUndefined();
    });
});