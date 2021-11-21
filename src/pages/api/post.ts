import type { NextApiRequest, NextApiResponse } from 'next'
import getPost from '../../server/services/post'
import { Response } from '../../server/config/response'

export default async function Post(req: NextApiRequest, res: NextApiResponse<Response>): Promise<void> {
    if (req.method === 'GET') {
        const postId = req.query.id
        if (typeof postId === "string") {
            let response: Response = await getPost(postId)
            if (response.error)
                res.status(500).json(response)
            else
                res.status(200).json(response)
        }
    }
}