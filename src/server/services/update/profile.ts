import client from '../../loaders/database'
import { Response } from '../../types/response'

export default async function updateProfile(username: string, newUsername: string): Promise<Response> {
    try {
        const mClient = await client
        const res1 = await mClient.db("Client").collection("posts").updateMany({"author.username": username}, { "$set": { "author.username": newUsername }})
        const res2 = await mClient.db("Client").collection("profiles").updateOne({username: username}, { "$set": { username: newUsername }})
        return {error: !(res1.acknowledged && res2.acknowledged)}
    } catch (err: object|unknown) {
        if (err && typeof err === "object")
            return {error: true, data: err}
        else
            return {error: true, data: {name: "Unknown error", message:"Unknown error occurred. Please try again."}}  
    }
}