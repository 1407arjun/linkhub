export default interface Post {
    title: string;
    body: string;
    date: string;
    upvotes: number;
    downvotes: number;
    flags: number;
    author: { name: string, username: string, email: string }
    tags: [ string ]
}