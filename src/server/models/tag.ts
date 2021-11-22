import mongoose from '../loaders/database'
import { userSchema } from './user'
import TypeTag from '../types/tag'

const tagSchema = new mongoose.Schema<TypeTag>({
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

const Tag = mongoose.models.Tag || mongoose.model<TypeTag>("Tag", tagSchema)

export default Tag
export { tagSchema }