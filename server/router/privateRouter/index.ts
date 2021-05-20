import express from 'express'
import passport from 'passport'
import userRouter from './userRouter'

const privateRouter = express.Router()

// authorization
privateRouter.use(passport.authenticate('jwt', { session: false }))

privateRouter.use('/user', userRouter)

export default privateRouter
