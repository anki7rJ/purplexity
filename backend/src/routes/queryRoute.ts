import express from 'express'
import { authMiddleware } from '../middleware/middleware'
import { purplexityAsk } from '../controller/queryContorller'


const Queryrouter = express.Router()

Queryrouter.use('/ask',authMiddleware, purplexityAsk)


export default Queryrouter


 