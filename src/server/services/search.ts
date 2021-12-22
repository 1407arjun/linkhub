import client from '../loaders/database'
import { Response } from '../types/response'

export default async function search(query: string): Promise<Response> {
    const regex = query.split(" ").join("|")
    try {
        const mClient = await client
        const posts = await mClient.db("Client").collection("posts")
                                .aggregate([{"$match": {"$or": [{title: {"$regex": ".*(" + regex + ").*", "$options": "$i"}}, {body: {"$regex": ".*(" + regex + ").*", "$options": "$i"}}, {tags: {"$regex": ".*(" + regex + ").*", "$options": "$i"}}]}},
                                    {"$project": {title : 1, author: 1, ratio: {"$cond": {"if": {downvotes: 0}, "then": "$upvotes", "else": {"$divide": ["$upvotes", "$downvotes"]}}}}},
                                    {"$sort": {ratio: -1}}]).toArray()
        const profiles = await mClient.db("Client").collection("profiles").find({"$or": [{name: {"$regex": ".*(" + regex + ").*", "$options": "$i"}}, {username: {"$regex": ".*(" + regex + ").*", "$options": "$i"}}]}).project({name: 1, username: 1, image: 1}).sort({name: 1}).toArray()
        
        let matchedTags = await await mClient.db("Client").collection("tags").find({name: {"$regex": ".*(" + regex + ").*", "$options": "$i"}}).project({name: 1, _id: 0}).toArray()
        matchedTags = matchedTags.map(tag => { return tag.name })
        let tags = await mClient.db("Client").collection("posts").aggregate([{$match: {tags: {"$in": matchedTags}}}, {$unwind: "$tags"},  {$sortByCount: "$tags"}]).toArray()
        tags = tags.filter(tag => { return matchedTags.includes(tag._id.toString()) })
        
        return {error: false, data: {posts: posts, profiles: profiles, tags: tags}}
    } catch (err: object|unknown) {
        if (err && typeof err === "object")
            return {error: true, data: err}
        else
            return {error: true, data: {name: "Unknown error", message:"Unknown error occurred. Please try again."}}
    }     
}