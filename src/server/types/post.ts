import TypeUser from './user'
import TypeTag from './tag'

export default interface Post {
    title: string;
    body: string;
    date: string;
    upvotes: number;
    downvotes: number;
    flags: number;
    author: TypeUser
    tags: [ TypeTag ]
}