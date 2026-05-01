import express from 'express'
import { getMe, loginUser, registerUser, logoutUser } from '../controllers/user.controller'
import { isAuthenticated } from '../middleware/auth.middleware'

const userRouter = express.Router()


userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
userRouter.post('/logout', isAuthenticated, logoutUser)
userRouter.get("/me", isAuthenticated, getMe);
export default userRouter