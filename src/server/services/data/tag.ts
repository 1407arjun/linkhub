import mongoose from '../../loaders/database'
import Tag from '../../models/tag'
import { Response } from '../../types/response'

export default async function getTag(tagId: string): Promise<Response> {
    await mongoose
    try {
        const data = await Tag.findById(tagId)
        return {error: false, data: data}
    } catch (err: object|unknown) {
        if (err && typeof err === "object")
            return {error: true, data: err}
        else
            return {error: true, data: {name: "Unknown error", message:"Unknown error occurred. Please try again."}}    
    }
}