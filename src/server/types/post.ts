import Profile from './profile'

export default interface Post {
    title: string;
    body: string;
    date: string;
    upvotes: number;
    downvotes: number;
    flags: number;
    author: Profile
    tags: [ string ]
}