import express from 'express'
import { checkAuth } from "../middlewares/auth.js"
import { getUserInfo } from "../controllers/userController.js"

const router = express.Router();

router.get("/", checkAuth, getUserInfo)


export default router