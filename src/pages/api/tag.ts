import type { NextApiRequest, NextApiResponse } from 'next'
import getTag from '../../server/services/data/tag'
import { Response } from '../../server/types/response'

export default async function Tag(req: NextApiRequest, res: NextApiResponse<Response>): Promise<void> {
    if (req.method === 'GET') {
        const tagName = req.query.tag
        if (typeof tagName === "string") {
            let response: Response = await getTag(tagName)
            if (response.error)
                res.status(500).json(response)
            else
                res.status(200).json(response)
        }
    }
}