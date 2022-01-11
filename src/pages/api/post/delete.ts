import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from "next-auth/react"
import deletePost from '../../../server/services/delete/post'
import client from '../../../server/loaders/database'

export default async function New(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    const session = await getSession({ req })
    if (session && session.user) {
        if (req.method === 'POST') {
            const data = req.body
            if (data.email === session.user.email) {
                const response = await deletePost(data._id)
                if (!response.error)
                    res.status(200).end()
                else
                    res.status(500).end()
            } else {
                try {
                    const mClient = await client
                    const profile = await mClient.db("Client").collection("profiles").findOne({email: session.user.email})

                    if (profile && profile.roles.includes("moderator")) {
                        const response = await deletePost(data._id)
                        if (!response.error)
                            res.status(200).end()
                        else
                            res.status(500).end()
                    } else
                        res.status(401).statusMessage
                } catch (e) {
                    console.log(e)
                    res.status(500).end()
                }
            }
        }
    } else {
        res.status(401).statusMessage
    }
}