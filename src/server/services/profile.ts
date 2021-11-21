import mongoose from '../loaders/database'
import Profile from '../models/profile'
import { Response } from '../config/response'

export default async function getProfile(userId: string): Promise<Response> {
    await mongoose
    try {
        const data = await Profile.findById(userId)
        return {error: false, data: data}
    } catch (err: object|unknown) {
        if (err && typeof err === "object")
            return {error: true, data: err}
        else
            return {error: true, data: {name: "Unknown error", message:"Unknown error occurred. Please try again."}}    
    }
}