import express from "express"
import authRouter from './authRouter'
import notesRouter from './notesRouter'
import profileRouter from './profileRouter'
import trashRouter from "./trashRouter";
import settingsRouter from "./settingsRouter";
const router= express.Router();


router.use('/notes',notesRouter);
router.use('/auth',authRouter);
router.use('/profile',profileRouter);
router.use('/trash',trashRouter);
router.use('/settings',settingsRouter);

export default router;