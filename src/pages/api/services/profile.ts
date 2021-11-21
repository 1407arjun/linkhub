import mongoose from 'mongoose'
import Profile from '../models/profile'
import { Response } from '../profile'

export default async (username: string): Promise<Response> => {
    let res: Response = {error: true, data: {name: "Unknown error", message:"Unknown error occurred. Please try again."}}
    //@ts-ignore 
    await mongoose.connect(process.env.MONGODB_STRING!, {useNewUrlParser: true, useUnifiedTopology: true, server: {poolSize: process.env.POOL_SIZE}}, async (err: object) => {
        if (err)
            res = {error: true, data: err}
        else {
            Profile.find({ username: username }, (error: object, data: object) => {
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