import mongoose from 'mongoose'
import TypeUser from '../types/user'

const userSchema = new mongoose.Schema<TypeUser>({
    username: {
        type: String,
        required: true
    },    
    name: {
        type: String,
        required: true
    },
    dob: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    provider: {
        type: String,
        required: true
    },
    hash: String,
    salt: String
})

const User = mongoose.models.User || mongoose.model<TypeUser>("User", userSchema)

export default User
export { userSchema }