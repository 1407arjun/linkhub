import client from '../../loaders/database'
import { Response } from '../../types/response'

export default async function getProfile(userId: string): Promise<Response> {
    const collection = (await client).db("Client").collection("profiles")
    try {
        const data = await collection.findOne({ _id: userId})
        return {error: false, data: data!}
    } catch (err: object|unknown) {
        if (err && typeof err === "object")
            return {error: true, data: err}
        else
            return {error: true, data: {name: "Unknown error", message:"Unknown error occurred. Please try again."}}    
    }
}