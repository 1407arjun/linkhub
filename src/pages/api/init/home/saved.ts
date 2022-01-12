import type { NextApiRequest, NextApiResponse } from 'next'
import type { Response } from '../../../../server/types/response'
import initializeHome from '../../../../server/loaders/home/saved'
import { getSession } from 'next-auth/react'

export default async function Init(req: NextApiRequest, res: NextApiResponse<Response>): Promise<void> {
    if (req.method === "POST") {
        //const session = await getSession({ req })
        if (true) {
            const data = req.body
            const response: Response = await initializeHome(data.saved)
            res.status(200).json(response)
        } else
            res.status(401).statusMessage
    }
}