import { ObjectId } from "mongodb";

export default interface Profile {
    name: string;
    email: string
    username: string | undefined;
    tags: string[];
    saved: ObjectId[];
    upvoted: ObjectId[];
    downvoted: ObjectId[];
    flagged: ObjectId[];
}