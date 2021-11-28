import client from '../../loaders/database'
import { Response } from '../../types/response'

export default async function getTag(tagName: string): Promise<Response> {
    const mClient = await client
    const collection = mClient.db("Client").collection("tags")
    try {
        const data = await collection.findOne({ name: tagName})
        //await mClient.close()
        return {error: false, data: data!}
    } catch (err: object|unknown) {
        if (err && typeof err === "object") {
            //await mClient.close()
            return {error: true, data: err}
        } else {
            //await mClient.close()
            return {error: true, data: {name: "Unknown error", message:"Unknown error occurred. Please try again."}}
        }      
    }
}