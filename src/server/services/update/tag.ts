import client from '../../loaders/database'
import { Response } from '../../types/response'

export default async function updateSaved(email: string, tag: string, remove: boolean): Promise<Response> {
    const mClient = await client
    try {
        const profile = await mClient.db("Client").collection("profiles").findOne({email: email})
        if (profile) {
            let tags: string[] = profile.tags
            
            if (remove) {
                tags = tags.filter((name: string) => { return name !== tag })
            } else {
                if (!tags.includes(tag))
                    tags.push(tag) 
            }

            const res = await mClient.db("Client").collection("profiles").updateMany({email: email}, { "$set": { tags: tags }})
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