import type { NextApiRequest, NextApiResponse } from 'next'
import getProfile from '../../server/services/tag'
import { Response } from '../../server/config/response'

export default async function Profile(req: NextApiRequest, res: NextApiResponse<Response>): Promise<void> {
    if (req.method === 'GET') {
        const username = req.query.username
        if (typeof username === "string") {
            let response: Response = await getProfile(username)
            if (response.error)
                res.status(500).json(response)
            else
                res.status(200).json(response)
        }
    }
}