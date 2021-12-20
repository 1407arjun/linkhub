import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from "next-auth/react"
import updateProfile from '../../../server/services/update/saved'

export default async function updateSaved(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    const session = await getSession({ req })
    if (session && session.user) {
        if (req.method === 'POST') {
            if (session.user.email) {
                const response = await updateProfile(session.user.email, req.body.postId, req.body.remove)
                
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