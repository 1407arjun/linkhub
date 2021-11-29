export default interface Profile {
    name: string;
    email: string
    username: string | undefined;
    tags: [ string ];
    saved: [ string ];
    upvoted: [ string ];
    downvoted: [ string ];
}