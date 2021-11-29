import client from '../../loaders/database'
import { Response } from '../../types/response'

export default async function updateProfile(username: string, newUsername: string): Promise<Response> {
    const mClient = await client
    try {
        const res1 = await mClient.db("Client").collection("posts").updateMany({author: username}, { $set: { author: newUsername }})
        const res2 = await mClient.db("Client").collection("profiles").updateOne({author: username}, { $set: { author: newUsername }})
        //await mClient.close()
        return {error: !(res1.acknowledged && res2.acknowledged)}
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