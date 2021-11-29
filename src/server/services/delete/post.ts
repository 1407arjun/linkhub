import { ObjectId } from 'bson'
import client from '../../loaders/database'
import { Response } from '../../types/response'

export default async function deletePost(postId: string): Promise<Response> {
    try {
        const mClient = await client
        const response = await mClient.db("Client").collection("posts").deleteOne({ _id: new ObjectId(postId)})
        //await mClient.close()
        return {error: !response.acknowledged}
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