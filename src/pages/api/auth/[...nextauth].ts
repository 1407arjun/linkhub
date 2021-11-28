import type { NextApiRequest, NextApiResponse } from 'next'
import dotenv from 'dotenv'
import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { MongoDBAdapter } from '@next-auth/mongodb-adapter'
import client from '../../../server/loaders/database'

dotenv.config()

export default async function Auth(req: NextApiRequest, res: NextApiResponse) { 
    return await NextAuth(req, res, {
        providers: [
            GoogleProvider({
                clientId: process.env.GOOGLE_CLIENT_ID!,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
                profileUrl: "https://www.googleapis.com/oauth2/v3/userinfo"
            })
        ],
        adapter: MongoDBAdapter(client),
        secret: process.env.AUTH_SECRET!,
        pages: {
            signIn: '/login',
            newUser: '/complete/username'
        },
        callbacks: {
            async signIn({ user, account, profile, email, credentials }) { 
                return true
            }
        }
    })
}  