import { ObjectId } from 'bson'
import client from '../../loaders/database'
import { Response } from '../../types/response'

export default async function deletePost(username: string, userId: string): Promise<Response> {
    const mClient = await client
    try {
        const res1 = await mClient.db("Client").collection("posts").deleteMany({author: username})
        const res2 = await mClient.db("Client").collection("profiles").deleteOne({username: username})
        const res3 = await mClient.db("Client").collection("users").deleteOne({_id: new ObjectId(userId)})
        const res4 = await mClient.db("Client").collection("accounts").deleteOne({userId: new ObjectId(userId)})
        
        //await mClient.close()
        return {error: !(res1.acknowledged && res2.acknowledged && res3.acknowledged && res4.acknowledged)}
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