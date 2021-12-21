import { ObjectId } from "mongodb";

export default interface Profile {
    name: string;
    email: string
    username: string | undefined;
    image: string;
    roles: string[];
    tags: string[];
    saved: ObjectId[];
    upvoted: ObjectId[];
    downvoted: ObjectId[];
    flagged: ObjectId[];
}