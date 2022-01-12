import client from '../database'
import { Response } from '../../types/response'

export default async function initializeHome(username: string, profileTags: string[]): Promise<Response> {
    try {
        const mClient = await client
        let date = new Date()
        date.setDate(date.getDate() - 3)
        const posts = await mClient.db("Client").collection("posts")
                            .aggregate([{"$match": {"author.username": {"$ne": username}, 
                                    tags: {"$in": profileTags}, date: {"$gte": date}}},
                                {"$project": {title : 1, body : 1, date: 1, upvotes: 1, downvotes: 1, flags: 1, author: 1, tags: 1, ratio: {"$cond": {"if": {downvotes: 0}, "then": "$upvotes", "else": {"$divide": ["$upvotes", "$downvotes"]}}}}},
                                {"$sort": {ratio: -1, date: -1}}
                                ]).toArray()

        const olderPosts = await mClient.db("Client").collection("posts")
                            .aggregate([{"$match": {"author.username": {"$ne": username}, 
                                    tags: {"$in": profileTags}, date: {"$lt": date}}},
                                {"$project": {title : 1, body : 1, date: 1, upvotes: 1, downvotes: 1, flags: 1, author: 1, tags: 1, ratio: {"$cond": {"if": {downvotes: 0}, "then": "$upvotes", "else": {"$divide": ["$upvotes", "$downvotes"]}}}}},
                                {"$sort": {ratio: -1, date: -1}}
                                ]).limit(25).toArray()

        return { error: false, data: { posts: posts, olderPosts: olderPosts }}
    } catch (e: object|unknown) {
        console.log(e)
        return { error: true, data: e }
    }
}