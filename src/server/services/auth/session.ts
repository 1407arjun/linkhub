import express from 'express'
import bodyParser from 'body-parser'
import mongoose from '../../loaders/database'
import User from '../../models/user'
import session from 'express-session'
import passport from 'passport'
import LocalStrategy from 'passport-local'

