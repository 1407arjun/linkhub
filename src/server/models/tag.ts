import mongoose from 'mongoose'
import { User, userSchema } from './user'

export interface Tag {
    name: string;
    followers: [ User ];
    related: [ string ];
}

const tagSchema = new mongoose.Schema<Tag>({
    name: {
        type: String,
        required: true
    },    
    followers: {
        type: [ userSchema ],
        required: true
    },
    related: {
        type: [ String ],
        required: true
    }
})

const tagModel = mongoose.models.Tag || mongoose.model<Tag>("Tag", tagSchema)

export default tagModel
export { tagSchema }