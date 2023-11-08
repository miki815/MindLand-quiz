import express from 'express';
import { UserController } from '../controllers/user.controller';

const userRouter = express.Router();

userRouter.route('/login').post(
    (req, res)=>new UserController().login(req, res)
)

userRouter.route('/register').post(
    (req, res)=>new UserController().register(req, res)
)

userRouter.route('/getBestUsers').post(
    (req, res)=>new UserController().getBestUsers(req, res)
)

userRouter.route('/resetPassword').post(
    (req, res)=>new UserController().resetPassword(req, res)
)

userRouter.route('/tokenValidation').post(
    (req, res)=>new UserController().tokenValidation(req, res)
)

userRouter.route('/changeForgotPassword').post(
    (req, res)=>new UserController().changeForgotPassword(req, res)
)

export default userRouter;