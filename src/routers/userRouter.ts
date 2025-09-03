import { Router } from "express";
import * as userController from '../controllers/userController'

const userRouter = Router();


userRouter.post('/', userController.createUser);
userRouter.post('/login', userController.loginUser)


export default userRouter;