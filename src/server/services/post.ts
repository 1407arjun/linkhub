import mongoose from '../loaders/database'
import Post from '../models/post'
import { Response } from '../config/response'

export default async function getPost(postId: string): Promise<Response> {
    await mongoose
    try {
        const data = await Post.findById(postId)
        return {error: false, data: data}
    } catch (err: object|unknown) {
        if (err && typeof err === "object")
            return {error: true, data: err}
        else
            return {error: true, data: {name: "Unknown error", message:"Unknown error occurred. Please try again."}}    
    }
}