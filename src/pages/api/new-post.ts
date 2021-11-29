import { ObjectId } from 'bson'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from "next-auth/react"
import client from '../../server/loaders/database'

export default async function New(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    const session = await getSession({ req })
    if (session && session.user) {
        if (req.method === 'POST') {
            const mClient = await client
            const data = req.body
            const profile = await mClient.db("Client").collection("profiles").findOne({email: session.user.email})
            const newPost = {
                title: data.title,
                body: data.body,
                tags: data.tags,
                date: data.date,
                upvotes: 0,
                downvotes: 0,
                flags: 0,
                author: new ObjectId(profile!._id)
            }
            const response = await mClient.db("Client").collection("posts").insertOne(newPost)
            //await mClient.close()
            if (response.acknowledged) {
                res.status(200).send({id: response.insertedId.toString()})
            } else
                res.status(500).end()
        }
    } else
        res.status(401).statusMessage
}    