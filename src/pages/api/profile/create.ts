import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from "next-auth/react"
import createProfile from '../../../server/services/create/profile'
import getProfile from '../../../server/services/read/profile'

export default async function New(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    const session = await getSession({ req })
    if (session && session.user) {
        if (req.method === 'POST') {
            const response = await createProfile(req.body.username, session.user.name!, session.user.email!, session.user.image!)
            
            if (!response.error)
                res.status(200).end()
            else
                res.status(500).end()    
        }
        if (req.method === 'GET') {
            const username = req.query.username.toString()
            const response = await getProfile(username)

            if (!response.error) {
                if (response.data)
                    res.status(200).json({ exists: true })
                else
                    res.status(200).json({ exists: false })    
            } else
                res.status(500).end()
        }

    } else
        res.status(401).statusMessage
}    