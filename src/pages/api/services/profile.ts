import mongoose from 'mongoose'
import Profile from '../models/profile'
import { Response } from '../profile'

export default async (username: string): Promise<Response|undefined> => {
    if (process.env.MONGODB_STRING) {
        await mongoose.connect(process.env.MONGODB_STRING, {useNewUrlParser: true, useUnifiedTopology: true}, (err: object) => {
            if (err)
                return {error: true, data: err}
            else {
                Profile.find({ username: username }, (error: object, data: object) => {
                    if (error)
                        return {error: true, data: error}
                    else 
                        return {error: false, data: data}       
                })
            }
        })
        await mongoose.connection.close()
    } else
        return {error: true, data: {name: "MongoDB connection error", message: "Could not connect to the server. Please try again later."}}     
}