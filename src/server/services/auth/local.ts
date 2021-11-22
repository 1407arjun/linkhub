import type { NextApiRequest, NextApiResponse } from 'next'
import express from 'express'
import bodyParser from 'body-parser'
import User from '../../models/user'
import TypeUser from '../../types/user'
import session from 'express-session'
import passport from 'passport'
import LocalStrategy from 'passport-local'

const app = express()
app.use(session({ secret: process.env.AUTH_SECRET!.toString() }))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(passport.initialize())
app.use(passport.session())

//@ts-ignore
passport.use(User.createStrategy());
//@ts-ignore
passport.serializeUser(User.serializeUser());
//@ts-ignore
passport.deserializeUser(User.deserializeUser());

passport.use(new LocalStrategy.Strategy(async (username, password, done) => {
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

export default function Local(action: string, req: NextApiRequest, res: NextApiResponse<Response>): void {
    if (action === "signup") {
        let newUser = new User({
            username: req.body.username,
            name: req.body.name,
            dob: req.body.dob,
            email: req.body.email,
            provider: "local"
        })

        //@ts-ignore
        User.register(newUser, req.body.password, (err: object, user: TypeUser): void => {
            if (err) {
                console.log(err)
                res.redirect("/signup")
            } else {
                passport.authenticate("local", { successRedirect: '/home', failureRedirect: '/signup', failureFlash: true })
            }
        })
    }
}