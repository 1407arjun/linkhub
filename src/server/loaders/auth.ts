import dotenv from 'dotenv'
import express from 'express'
import bodyParser from 'body-parser'
import User from '../models/user'
import session from 'express-session'
import passport from 'passport'

dotenv.config()

const app = express()
app.use(session({ secret: process.env.AUTH_SECRET!, resave: false, saveUninitialized: false}))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(passport.initialize())
app.use(passport.session())

//@ts-ignore
passport.use(User.createStrategy())
//@ts-ignore
passport.serializeUser((user, done) => {
    //@ts-ignore
    done(null, user._id);
})
//@ts-ignore
passport.deserializeUser(async (_id, done) => {
    //@ts-ignore
    try {
        const user = await User.findById(_id)
        done(null, user)
    } catch (err) {
        done(err)
    }
})

export default passport