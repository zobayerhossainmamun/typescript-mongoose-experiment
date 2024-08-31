// Basic Usage of Pick
export type User = {
    id: number;
    name: string;
    email: string;
    age: number;
};
export type UserIdAndName = Pick<User, 'id' | 'name'>;

// Nested Objects with Pick
export type NestedUser = {
    id: number;
    profile: {
        name: string;
        age: number;
    };
    contact: {
        email: string;
        phone: string;
    };
};
export type UserProfile = Pick<NestedUser, 'profile'>;

// Combining Pick with Other Utility Types
export type CombiningUser = {
    id: number;
    name: string;
    email: string;
    age: number;
};
export type PartialUserDetails = Partial<Pick<CombiningUser, 'name' | 'email'>>;