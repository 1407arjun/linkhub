import client from '../../loaders/database'
import { Response } from '../../types/response'

export default async function getProfile(username: string): Promise<Response> {
    try {
        const mClient = await client
        const data = await mClient.db("Client").collection("profiles").findOne({ username: username})
        return {error: false, data: data!}
    } catch (err: object|unknown) {
        if (err && typeof err === "object")
            return {error: true, data: err}
        else
            return {error: true, data: {name: "Unknown error", message:"Unknown error occurred. Please try again."}}
    }
}