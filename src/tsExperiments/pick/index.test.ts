import { PartialUserDetails, UserIdAndName, UserProfile } from ".";

describe('Basic Usage of Pick', () => {
    it('Should valid id and name other should undefined', () => {
        const userIdName: UserIdAndName = {
            id: 1,
            name: "John Doe",
        };
        expect(userIdName.id).toBe(1);
        expect(userIdName.name).toBe('John Doe');

        expect((userIdName as any).email).toBeUndefined();
        expect((userIdName as any).age).toBeUndefined();
    });
});

describe('Nested Objects with Pick', () => {
    it('Should valid profile other should undefined', () => {
        const userProfile: UserProfile = {
            profile: {
                name: 'Alice',
                age: 30,
            },
        };

        expect(userProfile.profile.name).toBe('Alice');
        expect(userProfile.profile.age).toBe(30);

        expect((userProfile as any).contact).toBeUndefined();
    });
});

describe('Combining Pick with Other Utility Types', () => {
    it('Should valid name | email other should undefined', () => {
        const partialUser: PartialUserDetails = {
            name: 'Bob'
        };

        expect(partialUser.name).toBe('Bob');
        expect(partialUser.email).toBeUndefined();

        expect((partialUser as any).age).toBeUndefined();
    });
});