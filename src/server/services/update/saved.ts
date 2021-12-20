import { ObjectId } from 'mongodb'
import client from '../../loaders/database'
import { Response } from '../../types/response'

export default async function updateSaved(email: string, postId: string, remove: boolean): Promise<Response> {
    const mClient = await client
    try {
        const profile = await mClient.db("Client").collection("profiles").findOne({email: email})
        if (profile) {
            let saved: ObjectId[] = profile.saved
            
            if (remove) {
                saved = saved.filter((id: ObjectId) => { return id.toString() !== postId })
            } else {
                if (!saved.includes(new ObjectId(postId)))
                    saved.push(new ObjectId(postId)) 
            }

            const res = await mClient.db("Client").collection("profiles").updateOne({email: email}, { "$set": { saved: saved }})
            //await mClient.close()
            return {error: !(res.acknowledged)}
        }
        //await mClient.close()
        return {error: !(profile)}
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