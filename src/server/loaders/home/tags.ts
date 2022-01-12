import client from '../database'
import { Response } from '../../types/response'

export default async function initializeHome(profileTags: string[]): Promise<Response> {
    try {
        const mClient = await client

        const tags = await mClient.db("Client").collection("posts").aggregate([{$match: {tags: {$nin: profileTags}}}, {$unwind: "$tags"},  {$sortByCount: "$tags"}]).limit(5).toArray()
        return { error: false, data: { tags: tags }}
    } catch (e: object|unknown) {
        console.log(e)
        return { error: true, data: e }
    }
}