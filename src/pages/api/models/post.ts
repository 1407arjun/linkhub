import mongoose from 'mongoose'
import { Tag, tagSchema } from './tag'
import { User, userSchema } from './user'

export interface Post {
    title: string;
    body: string;
    date: string;
    upvotes: number;
    downvotes: number;
    flags: number;
    author: User
    tags: [ Tag ]
}

const postSchema = new mongoose.Schema<Post>({
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

const postModel = mongoose.model<Post>("Post", postSchema)
export default postModel
export { postSchema }