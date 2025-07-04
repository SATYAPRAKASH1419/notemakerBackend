import express from 'express'
import { getCurrentUser, logoutUser, registerUser, signinUser } from '../controllers/auth.controller';
import { InputValidate} from '../utils/validator';
import {  RegisterSchema} from '../schema/register.schema';
import { SigninSchema } from '../schema/signin.schema';
import { requireAuth } from '../middlewares/auth.middleware';
const authRouter=express.Router();

authRouter.get("/me",requireAuth,getCurrentUser);
authRouter.post('/register',InputValidate(RegisterSchema),registerUser);

authRouter.post('/signin',InputValidate(SigninSchema),signinUser);

authRouter.post('/logout',logoutUser);

export default authRouter;