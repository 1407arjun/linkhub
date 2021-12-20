import { ObjectId } from 'mongodb'
import client from '../../loaders/database'
import { Response } from '../../types/response'

export default async function updatePost(email: string, postId: string, add: string|null, remove: string|null): Promise<Response> {
    const mClient = await client
    try {
        const profile = await mClient.db("Client").collection("profiles").findOne({email: email})
        if (profile) {
            let upvoted: ObjectId[] = profile.upvoted
            let downvoted: ObjectId[] = profile.downvoted
            let flagged: ObjectId[] = profile.flagged

            let res1
            if (remove !== null) {
                switch(remove) {
                    case "upvoted":
                        upvoted = upvoted.filter((id: ObjectId) => { return id.toString() !== postId })
                        res1 = await mClient.db("Client").collection("posts").updateOne({_id: new ObjectId(postId)}, {"$inc": {upvotes: -1}})
                        break
                    case "downvoted":
                        downvoted = downvoted.filter((id: ObjectId) => { return id.toString() !== postId })
                        res1 = await mClient.db("Client").collection("posts").updateOne({_id: new ObjectId(postId)}, {"$inc": {downvotes: -1}})
                        break
                    case "flagged":
                        flagged = flagged.filter((id: ObjectId) => { return id.toString() !== postId })
                        res1 = await mClient.db("Client").collection("posts").updateOne({_id: new ObjectId(postId)}, {"$inc": {flags: -1}})
                        break
                    default:
                        res1 = await mClient.db("Client").collection("posts").updateOne({_id: new ObjectId(postId)}, {"$inc": {upvotes: 0}})
                        break
                }
            } else
                res1 = await mClient.db("Client").collection("posts").updateOne({_id: new ObjectId(postId)}, {"$inc": {upvotes: 0}})

            if (add !== null) {
                switch(add) {
                    case "upvoted":
                        if (!upvoted.includes(new ObjectId(postId))) {
                            upvoted.push(new ObjectId(postId))
                            res1 = await mClient.db("Client").collection("posts").updateOne({_id: new ObjectId(postId)}, {"$inc": {upvotes: 1}})
                        }     
                        break
                    case "downvoted":
                        if (!downvoted.includes(new ObjectId(postId))) {
                            downvoted.push(new ObjectId(postId))
                            res1 = await mClient.db("Client").collection("posts").updateOne({_id: new ObjectId(postId)}, {"$inc": {downvotes: 1}})
                        }     
                        break
                    case "flagged":
                        if (!flagged.includes(new ObjectId(postId))) {
                            flagged.push(new ObjectId(postId))
                            res1 = await mClient.db("Client").collection("posts").updateOne({_id: new ObjectId(postId)}, {"$inc": {flags: 1}})
                        }
                        break
                    default:
                        res1 = await mClient.db("Client").collection("posts").updateOne({_id: new ObjectId(postId)}, {"$inc": {upvotes: 0}})
                        break 
                }
            } else
                res1 = await mClient.db("Client").collection("posts").updateOne({_id: new ObjectId(postId)}, {"$inc": {upvotes: 0}})
            
            const res2 = await mClient.db("Client").collection("profiles").updateOne({email: email}, { "$set": { upvoted: upvoted, downvoted: downvoted, flagged: flagged }})
            //await mClient.close()
            return {error: !(res1.acknowledged && res2.acknowledged)}
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