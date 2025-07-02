import express from "express"
import { changeTheme } from "../controllers/settings.controller";
import { requireAuth } from "../middlewares/auth.middleware";
const settingsRouter=express.Router();

settingsRouter.put('/',requireAuth ,changeTheme)

export default settingsRouter;