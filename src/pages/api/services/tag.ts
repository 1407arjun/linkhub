import mongoose from 'mongoose'
import Tag from '../models/tag'
import { Response } from '../tag'

export default async (tagId: string): Promise<Response> => {
    let res: Response = {error: true, data: {name: "Unknown error", message:"Unknown error occurred. Please try again."}}
    //@ts-ignore 
    await mongoose.connect(process.env.MONGODB_STRING!, {useNewUrlParser: true, useUnifiedTopology: true, server: {poolSize: process.env.POOL_SIZE}}, async (err: object) => {
        if (err)
            res = {error: true, data: err}
        else {
            Tag.find({ _id: tagId }, (error: object, data: object) => {
                if (error)
                    res = {error: true, data: error}
                else 
                    res = {error: false, data: data}       
            })
        }
        await mongoose.connection.close()
    })
    return res
}