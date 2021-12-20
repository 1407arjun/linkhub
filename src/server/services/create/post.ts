import client from '../../loaders/database'
import { Response } from '../../types/response'
import createTagIfNotExists from './tag'

export default async function createPost(data: any, email: string): Promise<Response> {
    try {
        const mClient = await client
        const profile = await mClient.db("Client").collection("profiles").findOne({email: email})
        const res = await createTagIfNotExists(data.tags)

        const newPost = {
            title: data.title,
            body: data.body,
            tags: data.tags,
            date: data.date,
            upvotes: 0,
            downvotes: 0,
            flags: 0,
            author: { name: profile!.name, username: profile!.username, email: profile!.email }
        }
        const response = await mClient.db("Client").collection("posts").insertOne(newPost)
        //await mClient.close()
        return {error: !(response.acknowledged && res), data: (response.acknowledged ? { insertedId: response.insertedId} : undefined)}
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