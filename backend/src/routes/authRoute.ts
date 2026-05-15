import express from "express"
import { logout, signin ,signup } from "../controller/authController"

const router = express.Router()


router.post('/signin',signin)
router.post('/signup',signup)
router.post('/logout',logout)



export default router