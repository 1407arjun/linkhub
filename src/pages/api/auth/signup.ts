import type { NextApiRequest, NextApiResponse } from 'next'
import LocalStrategy from '../../../server/services/auth/local'


export default async function Auth(req: NextApiRequest, res: NextApiResponse<Response>): Promise<void> {
    if (req.method === "POST") {
       LocalStrategy("signup", req, res)
    }
}