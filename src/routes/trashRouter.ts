import express from 'express'
import { deleteAllParmanently, deleteOneParmanently, getAllInTrash, getSingleInTrash, moveToActiveNote, moveToTrash } from '../controllers/trash.controller';
import { requireAuth } from '../middlewares/auth.middleware';
const trashRouter=express.Router();


trashRouter.get('/:noteId',requireAuth,getSingleInTrash)

trashRouter.get('/',requireAuth,getAllInTrash)

trashRouter.put('/:noteId',requireAuth,moveToTrash)
trashRouter.put('/active/:noteId',requireAuth,moveToActiveNote)

trashRouter.delete('/',requireAuth,deleteAllParmanently)

trashRouter.delete('/:noteId',requireAuth,deleteOneParmanently)



export default trashRouter;