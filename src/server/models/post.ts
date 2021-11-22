import mongoose from '../loaders/database'
import { tagSchema } from './tag'
import { userSchema } from './user'
import TypePost from '../types/post'

const postSchema = new mongoose.Schema<TypePost>({
    title: {
        type: String,
        required: true
    },    
    body: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    upvotes: {
        type: Number,
        required: true
    },
    downvotes: {
        type: Number,
        required: true
    },
    flags: {
        type: Number,
        required: true
    },
    author: {
        type: userSchema,
        required: true
    },
    tags: {
        type: [ tagSchema ],
        required: true
    }
})

const Post = mongoose.models.Post || mongoose.model<TypePost>("Post", postSchema)

export default Post
export { postSchema }