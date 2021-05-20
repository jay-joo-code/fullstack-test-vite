import express from 'express'
import templateRouter from './templateRouter'
import authRouter from './authRouter'

const publicRouter = express.Router()

publicRouter.use('/template', templateRouter)
publicRouter.use('/auth', authRouter)

export default publicRouter
