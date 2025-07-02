import express, { NextFunction, Request, Response } from "express"
import { createNote, getAllNotes, getSingleNote, updateSingleNote } from "../controllers/notes.controller";
import { requireAuth } from "../middlewares/auth.middleware";
import { InputValidate} from "../utils/validator";
import { noteCreateSchema } from "../schema/noteCreate.schema";
import { noteUpdateSchema } from "../schema/noteUpdate.schema";
const notesRouter =express.Router();

notesRouter.post('/',requireAuth, InputValidate(noteCreateSchema) ,createNote)

notesRouter.get('/',requireAuth,getAllNotes)

notesRouter.get('/:noteId',requireAuth,getSingleNote)

notesRouter.put('/:noteId',requireAuth,InputValidate(noteUpdateSchema),updateSingleNote)

export default notesRouter;
