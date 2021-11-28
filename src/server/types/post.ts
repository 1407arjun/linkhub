import User from './user'
import Tag from './tag'

export default interface Post {
    title: string;
    body: string;
    date: string;
    upvotes: number;
    downvotes: number;
    flags: number;
    author: User
    tags: [ Tag ]
}