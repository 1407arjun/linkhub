import type { NextApiRequest, NextApiResponse } from 'next'
import dotenv from 'dotenv'
import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import GitHubProvider from 'next-auth/providers/github'
import { MongoDBAdapter } from '@next-auth/mongodb-adapter'
import client from '../../../server/loaders/database'
import axios from 'axios'

dotenv.config()

export default async function Auth(req: NextApiRequest, res: NextApiResponse) { 
    return await NextAuth(req, res, {
        providers: [
            GoogleProvider({
                clientId: process.env.GOOGLE_CLIENT_ID!,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
                profileUrl: "https://www.googleapis.com/oauth2/v3/userinfo"
            })
            //error=OAuthAccountNotLinked
            /*GitHubProvider({
                clientId: process.env.GITHUB_CLIENT_ID!,
                clientSecret: process.env.GITHUB_CLIENT_SECRET!,
                profileUrl: "https://api.github.com/user",    
            })*/
        ],
        adapter: MongoDBAdapter(client),
        secret: process.env.AUTH_SECRET!,
        pages: {
            signIn: '/login',
            signOut: '',
            newUser: '/complete/username'
        },
        callbacks: {
            async signIn({ user, account, profile, email, credentials }) { 
                /*console.log(account)
                console.log(user)
                console.log(profile)
                if (account.provider === "github") {
                    const token = account.access_token
                    const res = await axios.get("https://api.github.com/user/emails", {
                        headers: {
                            'Authorization': ("token " + token),
                            'Accept': 'application/vnd.github.v3+json'
                        }
                    })
                    console.log(res)
                }*/
                return true
            }
        }
    })
}  