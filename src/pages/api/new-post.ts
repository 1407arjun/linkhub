import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from "next-auth/react"
import client from '../../server/loaders/database'

export default async function New(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    const session = await getSession({ req })
    if (session && session.user) {
        if (req.method === 'POST') {
            const mClient = await client
            const data = JSON.parse(req.body)
            const profile = await mClient.db("Client").collection("profiles").findOne({"user.email": session.user.email})
            const newPost = {
                title: data.title,
                body: data.body,
                tags: data.tags,
                date: data.date,
                upvotes: 0,
                downvotes: 0,
                flags: 0,
                author: profile
            }
            const response = await mClient.db("Client").collection("posts").insertOne(newPost)
            await mClient.close()
            if (response.acknowledged) {
                res.status(200).redirect("/post/" + response.insertedId.toString())
            } else
                res.status(500).redirect("/home")
        }
    } else
        res.status(401).statusMessage
}    