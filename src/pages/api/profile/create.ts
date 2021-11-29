import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from "next-auth/react"
import createProfile from '../../../server/services/create/profile'

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
    } else
        res.status(401).statusMessage
}    