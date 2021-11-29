import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from "next-auth/react"
import client from '../../server/loaders/database'
import { ObjectId } from "bson"

export default async function New(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    const session = await getSession({ req })
    if (session && session.user) {
        if (req.method === 'POST') {
            const mClient = await client
            const username = req.body.username
            const user = await mClient.db("Client").collection("users").findOne({email: session.user.email})
            const newProfile = {
                _id: new ObjectId(user!._id),
                username: username,
                name: session.user.name,
                email: session.user.email,
                tags: [],
                posts: [],
                saved: [],
                upvoted: [],
                downvoted: []
            }
            const response = await mClient.db("Client").collection("profiles").insertOne(newProfile)
            //await mClient.close()
            if (response.acknowledged)
                res.status(200).end()
            else
                res.status(500).end()    
        }
        if (req.method === 'GET') {
            const mClient = await client
            const username = req.query.reqname
            const profile = await mClient.db("Client").collection("profiles").findOne({username: username})
            //await mClient.close()
            if (profile)
                res.json({ exists: true })
            else
                res.json({ exists: false })    
        }
    } else
        res.status(401).statusMessage
}    