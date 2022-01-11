import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from "next-auth/react"
import deletePost from '../../../server/services/delete/post'
import client from '../../../server/loaders/database'
import { ObjectId, UpdateResult } from 'mongodb'

export default async function New(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    const session = await getSession({ req })
    if (session && session.user) {
        if (req.method === 'POST') {
            const data = req.body
            console.log(data)
            try {
                const mClient = await client
                const profile = await mClient.db("Client").collection("profiles").findOne({email: session.user.email})

                if (profile && profile.roles.includes("moderator")) {
                    if (data.action === 1) {
                        //@ts-ignore
                        const res1: UpdateResult = await mClient.db("Client").collection("profiles").updateMany({}, { "$pull": { flagged: new ObjectId(data._id) }})
                        const res2 = await mClient.db("Client").collection("posts").updateOne({_id: new ObjectId(data._id)}, { "$set": { flags: 0 }})
                        console.log(res1)
                        console.log(res2)
                        if (res1.acknowledged && res2.acknowledged)
                            res.status(200).end()
                        else
                            res.status(500).end()
                    } else if (data.action === 0) {
                        const response = await deletePost(data._id)
                        if (!response.error)
                            res.status(200).end()
                        else
                            res.status(500).end()
                    } else
                        res.status(500).end()
                } else
                    res.status(401).statusMessage
            } catch (e) {
                console.log(e)
                res.status(500).end()
            }
        }
    } else {
        res.status(401).statusMessage
    }
}