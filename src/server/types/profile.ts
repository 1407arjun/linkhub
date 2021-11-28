import User from './user'
import Tag from './tag'
import Post from './post'

export default interface Profile {
    user: User;
    username: string | undefined;
    tags: [ Tag ];
    saved: [ Post ];
    upvoted: [ Post ];
    downvoted: [ Post ];
}