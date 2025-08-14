import {Router} from "express"
import userController from '../controllers/user.controller.js'
import { verifyJWT } from "../middlewares/auth.middleware.js"
const router =Router()

router.route("/register").post(userController.RegisterUser)
router.route("/login").post(userController.loginUser)
router.route("/me").get(verifyJWT,userController.getCurrentUser)

export default router;