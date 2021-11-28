import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from "next-auth/react"
import client from '../../server/loaders/database'
import { ObjectId } from "bson"

export default async function Post(req: NextApiRequest, res: NextApiResponse<Response>): Promise<void> {
    const session = await getSession()
    if (session && session.user) {
        if (req.method === 'POST') {
            const username = req.body.username
            const user = await (await client).db("Client").collection("users").findOne({email: session.user.email})
            const newProfile = {
                _id: new ObjectId(user!._id),
                user: user,
                username: username,
                tags: [],
                posts: [],
                saved: [],
                upvoted: [],
                downvoted: []
            }
            const response = await (await client).db("Client").collection("profiles").insertOne(newProfile)
            if (response.acknowledged)
                res.status(200).redirect("/home")
            else
                res.redirect("/complete/username")    
        }
    } else
        res.status(401).statusMessage
}    