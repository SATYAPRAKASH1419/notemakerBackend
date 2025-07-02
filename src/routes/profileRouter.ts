import express from 'express'
import { getProfile, updateProfile } from '../controllers/profile.controller';
import { requireAuth } from '../middlewares/auth.middleware';
import { InputValidate } from '../utils/validator';
import { UpdateProfileSchema } from '../schema/profileUpdate.schema';
const profileRouter=express.Router();

profileRouter.get('/',requireAuth, getProfile)

profileRouter.put('/',requireAuth,InputValidate(UpdateProfileSchema),updateProfile)

export default profileRouter;


