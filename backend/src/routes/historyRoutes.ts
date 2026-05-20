import express from 'express'
import { authMiddleware } from "../middleware/middleware";
import { history } from '../controller/historyController';

const HistoryRouter = express.Router()




HistoryRouter.use('/userHistory', authMiddleware,history)


export  default HistoryRouter