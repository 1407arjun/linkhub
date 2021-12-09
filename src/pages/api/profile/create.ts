import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from "next-auth/react"
import createProfile from '../../../server/services/create/profile'
import client from '../../../server/loaders/database'

export default async function New(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    const session = await getSession({ req })
    if (session && session.user) {
        if (req.method === 'POST') {
            const response = await createProfile(req.body.username, session.user.name!, session.user.email!)
            //await mClient.close()
            if (!response.error)
                res.status(200).end()
            else
                res.status(500).end()    
        }
        if (req.method === 'GET') {
            const username = req.query.username
            try {
                const mClient = await client
                const match = await mClient.db("Client").collection("profiles").findOne({username: username})

                //await mClient.close()
                res.status(200).json({error: false, exists: (match ? true : false)})
            } catch (e: object|unknown) {
                //await mClient.close()
                res.status(500).json({error: true, data: e})
            }
        }

    } else
        res.status(401).statusMessage
}    