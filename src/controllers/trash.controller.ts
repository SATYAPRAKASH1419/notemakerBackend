import { Request, Response } from 'express'
import { prisma } from '../utils/prisma';
import { HTTP_STATUS } from '../constants/httpStatus';

export const getAllInTrash = async (req:Request,res:Response):Promise<void>=>{
  try {
    const TrashedNotes= await prisma.note.findMany({
        where:{
            userId:req.userId,
            trashed:true
        }
    })


    res.status(HTTP_STATUS.OK).json({
        message:"Fetched all Trashed notes successfully!",
        notes:TrashedNotes,
        exist:TrashedNotes.length>0
    })
    return;
   } catch (error) {
    console.log("Error while fetching all Trashed Notes :",error);
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        error:"Error while fetching all Trashed notes"
    })
    return;
   }
}

export const getSingleInTrash =async (req:Request,res:Response):Promise<void>=>{
   const noteId = req.params.noteId;
   try {
    const TrashedNote= await prisma.note.findFirst({
        where:{
            noteId:noteId,
            userId:req.userId,
            trashed:true
        }
    })
    if(!TrashedNote){
        res.status(HTTP_STATUS.NOT_FOUND).json({
            message:"No Notes found in trash",
            exist:false
        })

        return;
    }

    res.status(HTTP_STATUS.OK).json({
        message:"Fetched a trashed note successfully!",
        note:TrashedNote
    })
    return;
   } catch (error) {
    console.log("Error while fetching a  single trashed note :",error);
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        error:"Error while fetching a single trashed note"
    })
    return;
   }
}


export const moveToTrash = async (req:Request,res:Response) : Promise<void>=>{

   const noteId=req.params.noteId;
   try {
    const note= await prisma.note.findFirst({
        where:{
            userId:req.userId,// is it required ?
            noteId:noteId,
            trashed:false
        }
    })
    if(!note){
        res.status(HTTP_STATUS.NOT_FOUND).json({
            error:"Note not found in active file or file do not exist",
            exist:false
        })
        return;
    }
    
    const updatedNote=await prisma.note.update({
        where:{
            noteId:noteId
        },
        data:{
            trashed:true
        }
    })

    res.status(HTTP_STATUS.OK).json({
        message:"Note moved to trash",
        TrashedNote:updatedNote,
        exist:true
    })
    return;

   } catch (error) {
      console.log("Error in moving to trash :",error);
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        message:"Error while moving the note to trash",
      })
      return;
   }

}

export const deleteAllParmanently=async (req:Request,res:Response):Promise<void>=>{
 try {
    const TrashedNotes= await prisma.note.deleteMany({
        where:{
            userId:req.userId,
            trashed:true
        }
    })


    res.status(HTTP_STATUS.OK).json({
        message:"All notes in trash delted successfully",
    })
    return;
   } catch (error) {
    console.log("Error while deleting all Trashed Notes :",error);
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        error:"Error while deleting all Trashed notes"
    })
    return;
   }
}

export const deleteOneParmanently=async (req:Request,res:Response):Promise<void>=>{
     const noteId = req.params.noteId;
   try {
    const TrashedNote= await prisma.note.findFirst({
        where:{
            noteId:noteId,
            userId:req.userId,
            trashed:true
        }
    })
    if(!TrashedNote){
        res.status(HTTP_STATUS.NOT_FOUND).json({
            message:"No Notes found in trash",
            exist:false
        })

        return;
    }
       await prisma.note.delete({
        where:{
            noteId:noteId,
            userId:req.userId,
            trashed:true
        }
    })

    res.status(HTTP_STATUS.OK).json({
        message:"A single note in trash deleted successfully!",
    })
    return;
   } catch (error) {
    console.log("Error while deleting a  single trashed note :",error);
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        error:"Error while deleting a single trashed note"
    })
    return;
   }
}


export const moveToActiveNote = async (req:Request,res:Response) : Promise<void>=>{

   const noteId=req.params.noteId;
   try {
    const note= await prisma.note.findFirst({
        where:{
            userId:req.userId,// is it required ?
            noteId:noteId,
            trashed:true
        }
    })
    if(!note){
        res.status(HTTP_STATUS.NOT_FOUND).json({
            error:"Note not found in trash or does not exist",
            exist:false
        })
        return;
    }
    
    const updatedNote=await prisma.note.update({
        where:{
            noteId:noteId
        },
        data:{
            trashed:false
        }
    })

    res.status(HTTP_STATUS.OK).json({
        message:"Note moved to active Notes",
        TrashedNote:updatedNote,
        exist:true
    })
    return;

   } catch (error) {
      console.log("Error in moving to active notes :",error);
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        message:"Error while moving the trashed note to active notes",
      })
      return;
   }

}