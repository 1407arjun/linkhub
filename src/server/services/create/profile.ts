import client from '../../loaders/database'
import { Response } from '../../types/response'
import { ObjectId } from 'mongodb'

export default async function createPost(username: string, name: string, email: string, image: string): Promise<Response> {
    try {
        const mClient = await client
        const user = await mClient.db("Client").collection("users").findOne({email: email})
        const newProfile = {
            _id: new ObjectId(user!._id),
            username: username,
            name: name,
            email: email,
            image: image,
            roles: [],
            tags: [],
            saved: [],
            upvoted: [],
            downvoted: [],
            flagged: []
        }

        const response = await mClient.db("Client").collection("profiles").insertOne(newProfile)
        return {error: !response.acknowledged}
    } catch (err: object|unknown) {
        if (err && typeof err === "object")
            return {error: true, data: err}
        else
            return {error: true, data: {name: "Unknown error", message:"Unknown error occurred. Please try again."}}
    }     
}
