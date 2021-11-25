import type { NextApiRequest, NextApiResponse } from 'next'
import passport from '../../../loaders/auth'
import LocalStrategy from 'passport-local'
import User from '../../../models/user'

export default async function Local(req: NextApiRequest, res: NextApiResponse<Response>): Promise<void> {
    passport.use(new LocalStrategy.Strategy(async (username: string, password: string, done) => {
        let user = await User.findOne({username: username})
        try {
            if (!user)
                return done(null, false, {message: "No user exists with the given username."})
            if (!user.validPassword(password))
                return done(null, false, {message: "Incorrect password."})
            return done(null, user)  
        } catch(err) {
            return done(err)
        }
    }))

    let newUser: typeof User = new User({
        username: req.body.username,
        name: req.body.name,
        dob: req.body.dob,
        email: req.body.email,
        provider: "local"
    })

    try {
        //@ts-ignore
        await newUser.setPassword(req.body.password)
        //@ts-ignore
        await newUser.save()
        try {
            //@ts-ignore
            const { user } = await User.authenticate()(newUser.username, req.body.password)
            res.redirect("/home")
        } catch (e) {
            console.log(e)
            res.redirect("/auth/login")
        }
    } catch (err) {
        console.log(err)
        res.redirect("/auth/signup")
    }    
}