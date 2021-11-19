import type { NextApiRequest, NextApiResponse } from 'next'
import getProfile from './services/tag'

export type Response = {
    error: boolean
    data: object
}

export default async (req: NextApiRequest, res: NextApiResponse<Response>) => {
    if (req.method === 'GET') {
        const username = req.query.username
        if (typeof username === "string") {
            let response: Response|undefined = await getProfile(username)
            if (response) {
                if (response.error)
                    res.status(500).json(response)
                else
                    res.status(200).json(response)
            } else
                res.status(500).json({error: true, data: {name: "Unknown error", message: "Unknown error occured."}})        
        }
    }
}