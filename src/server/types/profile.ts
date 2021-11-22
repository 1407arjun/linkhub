import TypeUser from './user'
import TypeTag from './tag'
import TypePost from './post'

export default interface Profile {
    user: TypeUser;
    tags: [ TypeTag ];
    posts: [ TypePost ];
    saved: [ TypePost ];
    upvoted: [ TypePost ];
    downvoted: [ TypePost ];
}