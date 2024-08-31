import { User } from ".";

describe('sum function', () => {
    it('Should have correct properties', () => {
        const user: User = {
            id: 1,
            name: "Mamun",
        };
        expect(user).toHaveProperty('id', 1);
        expect(user).toHaveProperty('name', 'Mamun');
    });
});