import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from "next-auth/react"
import updateProfile from '../../../server/services/update/profile'

export default async function New(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    const session = await getSession({ req })
    if (session && session.user) {
        if (req.method === 'POST') {
            const data = req.body
            if (data.email === session.user.email) {
                const response = await updateProfile(data.username, data.newUsername)
                if (!response.error)
                    res.status(200).end()
                else
                    res.status(500).end()    
            } else
                res.status(401).statusMessage
        }
    } else {
        res.status(401).statusMessage
    }
}