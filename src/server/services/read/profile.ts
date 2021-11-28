import { ObjectId } from 'bson'
import client from '../../loaders/database'
import { Response } from '../../types/response'

export default async function getProfile(userId: string): Promise<Response> {
    const mClient = await client
    const collection = mClient.db("Client").collection("profiles")
    try {
        const data = await collection.findOne({ _id: new ObjectId(userId)})
        await mClient.close()
        return {error: false, data: data!}
    } catch (err: object|unknown) {
        if (err && typeof err === "object") {
            await mClient.close()
            return {error: true, data: err}
        } else {
            await mClient.close()
            return {error: true, data: {name: "Unknown error", message:"Unknown error occurred. Please try again."}}
        }     
    }
}