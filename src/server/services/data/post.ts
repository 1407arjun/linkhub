import { ObjectId } from 'bson'
import client from '../../loaders/database'
import { Response } from '../../types/response'

export default async function getPost(postId: string): Promise<Response> {
    const collection = (await client).db("Client").collection("posts")
    try {
        const data = await collection.findOne({ _id: new ObjectId(postId)})
        return {error: false, data: data!}
    } catch (err: object|unknown) {
        if (err && typeof err === "object")
            return {error: true, data: err}
        else
            return {error: true, data: {name: "Unknown error", message:"Unknown error occurred. Please try again."}}    
    }
}