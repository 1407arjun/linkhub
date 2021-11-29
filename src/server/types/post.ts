import Profile from './profile'

export default interface Post {
    title: string;
    body: string;
    date: string;
    upvotes: number;
    downvotes: number;
    flags: number;
    author: string
    tags: [ string ]
}