import type { NextApiRequest, NextApiResponse } from 'next'
import type { Response } from '../../server/types/response'

export default async function Auth(req: NextApiRequest, res: NextApiResponse<Response>): Promise<void> {
    //@ts-ignore
    //if (req.isAuthenticated())
        //@ts-ignore
    res.status(200).json({error: false, data: req.body})
}