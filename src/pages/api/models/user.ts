import mongoose from 'mongoose'

export interface User {
    username: string;
    name: string;
    dob: string;
    email: string;
    auth: string;
}

const userSchema = new mongoose.Schema<User>({
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
    auth: {
        type: String,
        required: true
    }
})

const userModel = mongoose.model<User>("User", userSchema)
export default userModel
export { userSchema }