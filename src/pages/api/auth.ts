import type { NextApiRequest, NextApiResponse } from 'next'
import LocalStrategy from '../../server/services/auth/local'

export default async function Auth(req: NextApiRequest, res: NextApiResponse<Response>): Promise<void> {
    if (req.method === "POST") {
        let action: string = req.query.action.toString()
        let strategy: string = req.query.strategy.toString()

        if (strategy === "local")
            LocalStrategy(action, req, res)
    }
}