import mongoose from '../loaders/database'
import { userSchema } from './user'
import { postSchema } from './post'
import { tagSchema } from './tag'
import TypeProfile from '../types/profile'

const profileSchema = new mongoose.Schema<TypeProfile>({
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

const Profile = mongoose.models.Profile || mongoose.model<TypeProfile>("Profile", profileSchema)

export default Profile
export { profileSchema }