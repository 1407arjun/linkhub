export default interface TypeUser {
    username: string;
    name: string;
    dob: string;
    email: string;
    provider: string;
    hash?: string;
    salt?: string;
}