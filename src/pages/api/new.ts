import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from "next-auth/react"
import client from '../../server/loaders/database'
import { ObjectId } from "bson"

export default async function New(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    const session = await getSession({ req })
    if (session && session.user) {
        if (req.method === 'POST') {
            const username = JSON.parse(req.body).username
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
        if (req.method === 'GET') {
            const username = req.query.reqname
            const profile = await (await client).db("Client").collection("profiles").findOne({username: username})
            if (profile)
                res.json({ exists: true })
            else
                res.json({ exists: false })    
        }
    } else
        res.status(401).statusMessage
}    