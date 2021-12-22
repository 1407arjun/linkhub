import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from "next-auth/react"
import createPost from '../../../server/services/create/post'

export default async function New(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    const session = await getSession({ req })
    if (session && session.user) {
        if (req.method === 'POST') {
            const response = await createPost(req.body, session.user.email!)

            if (!response.error && response.data) {
                //@ts-ignore
                res.status(200).send({id: response.data.insertedId.toString()})
            } else
                res.status(500).end()
        }
    } else
        res.status(401).statusMessage
}    