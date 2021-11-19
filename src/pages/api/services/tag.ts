import mongoose from 'mongoose'
import Tag from '../models/tag'
import { Response } from '../tag'

export default async (tagId: string): Promise<Response|undefined> => {
    if (process.env.MONGODB_STRING) {
        await mongoose.connect(process.env.MONGODB_STRING, {useNewUrlParser: true, useUnifiedTopology: true}, (err: object) => {
            if (err)
                return {error: true, data: err}
            else {
                Tag.find({ _id: tagId }, (error: object, data: object) => {
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