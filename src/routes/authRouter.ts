import express from 'express'
import { logoutUser, registerUser, signinUser } from '../controllers/auth.controller';
import { InputValidate} from '../utils/validator';
import {  RegisterSchema} from '../schema/register.schema';
import { SigninSchema } from '../schema/signin.schema';
const authRouter=express.Router();

authRouter.post('/register',InputValidate(RegisterSchema),registerUser);

authRouter.post('/signin',InputValidate(SigninSchema),signinUser);

authRouter.post('/logout',logoutUser);

export default authRouter;