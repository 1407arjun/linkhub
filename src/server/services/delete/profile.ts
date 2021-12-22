import { ObjectId, UpdateResult } from 'mongodb'
import client from '../../loaders/database'
import { Response } from '../../types/response'

export default async function deleteProfile(username: string, userId: string): Promise<Response> {
    try {
        const mClient = await client
        
        const res0 = await mClient.db("Client").collection("profiles").findOne({username: username})
        const res1 = await mClient.db("Client").collection("posts").deleteMany({"author.username": username})
        //@ts-ignore
        const res2: UpdateResult = await mClient.db("Client").collection("profiles").updateMany({}, { "$pull": { saved: {"$in": res0.saved} }})
        const res3 = await mClient.db("Client").collection("profiles").deleteOne({username: username})
        const res4 = await mClient.db("Client").collection("users").deleteOne({_id: new ObjectId(userId)})
        const res5 = await mClient.db("Client").collection("accounts").deleteOne({userId: new ObjectId(userId)})
        
        return {error: !(res0 && res1.acknowledged && res2.acknowledged && res3.acknowledged && res4.acknowledged && res5.acknowledged)}
    } catch (err: object|unknown) {
        if (err && typeof err === "object")
            return {error: true, data: err}
        else
            return {error: true, data: {name: "Unknown error", message:"Unknown error occurred. Please try again."}}   
    }
}