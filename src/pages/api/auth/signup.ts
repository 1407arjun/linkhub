import type { NextApiRequest, NextApiResponse } from 'next'
import LocalStrategy from '../../../server/services/auth/signup/local'


export default async function SignUp(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    if (req.method === "POST") {
       await LocalStrategy(req, res)
    }
}