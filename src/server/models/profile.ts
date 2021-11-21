import mongoose from 'mongoose'
import { User, userSchema } from './user'
import { Post, postSchema } from './post'
import { Tag, tagSchema } from './tag'

export interface Profile {
    user: User;
    tags: [ Tag ];
    posts: [ Post ];
    saved: [ Post ];
    upvoted: [ Post ];
    downvoted: [ Post ];
}

const profileSchema = new mongoose.Schema<Profile>({
    user: {
        type: userSchema,
        required: true
    },    
    tags: {
        type: [ tagSchema ],
        required: true
    },
    posts: {
        type: [ postSchema ],
        required: true
    },
    saved: {
        type: [ postSchema ],
        required: true
    },
    upvoted: {
        type: [ postSchema ],
        required: true
    },
    downvoted: {
        type: [ postSchema ],
        required: true
    }
})

const profileModel = mongoose.models.Profile || mongoose.model<Profile>("Profile", profileSchema)

export default profileModel
export { profileSchema }