import client from '../../loaders/database'
import { Response } from '../../types/response'

export default async function updateTags(email: string, tag: string, remove: boolean): Promise<Response> {
    try {
        const mClient = await client
        const profile = await mClient.db("Client").collection("profiles").findOne({email: email})
        
        if (profile) {
            let tags: string[] = profile.tags
            
            if (remove) {
                tags = tags.filter((name: string) => { return name !== tag })
            } else {
                if (!tags.includes(tag))
                    tags.push(tag) 
            }

            const res = await mClient.db("Client").collection("profiles").updateOne({email: email}, { "$set": { tags: tags }})
            return {error: !(res.acknowledged)}
        }
        return {error: !(profile)}
    } catch (err: object|unknown) {
        if (err && typeof err === "object")
            return {error: true, data: err}
        else  
            return {error: true, data: {name: "Unknown error", message:"Unknown error occurred. Please try again."}}    
    }
}