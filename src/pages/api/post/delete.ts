import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from "next-auth/react"
import deletePost from '../../../server/services/delete/post'

export default async function New(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    const session = await getSession({ req })
    if (session && session.user) {
        if (req.method === 'POST') {
            const data = JSON.parse(req.body)
            if (data.email === session.user.email) {
                const response = await deletePost(data._id)
                if (!response.error)
                    res.status(200).redirect("/home")
                else
                    res.status(500).redirect("/home")    
            } else
                res.status(401).statusMessage
        }
    } else {
        res.status(401).statusMessage
    }
}        