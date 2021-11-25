import mongoose from 'mongoose'

export default async function Connect() {
    try {
        const db = await mongoose.connect(process.env.MONGO_CLIENT_URI!, {useNewUrlParser: true, useUnifiedTopology: true})
    } catch (err) {
        console.log(err)
    }
}    
