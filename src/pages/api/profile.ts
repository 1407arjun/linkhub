import type { NextApiRequest, NextApiResponse } from 'next'
import getProfile from '../../server/services/data/tag'
import { Response } from '../../server/types/response'

export default async function Profile(req: NextApiRequest, res: NextApiResponse<Response>): Promise<void> {
    if (req.method === 'GET') {
        const userId = req.query.id
        if (typeof userId === "string") {
            let response: Response = await getProfile(userId)
            if (response.error)
                res.status(500).json(response)
            else
                res.status(200).json(response)
        }
    }
}