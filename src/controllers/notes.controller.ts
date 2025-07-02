import { Request,Response } from "express";
import { prisma } from "../utils/prisma";
import { HTTP_STATUS } from "../constants/httpStatus";

export const createNote = async (req:Request,res:Response):Promise<void>=>{
  const data=req.body;
  try {
    
    if (!req.userId) {
        res.status(HTTP_STATUS.UNAUTHORIZED).json({
            error: "User ID is missing"
        });
        return;
    }
    const newNote= await prisma.note.create({
        data:{
            title:data.title,
            content:data.content,
            userId:req.userId
        }
    })

    res.status(HTTP_STATUS.CREATED).json({
        message:"New Note Created successfully",
        note:newNote
    })
    return;
  } catch (error) {
    console.log("Error while Creating a new Note :",error);
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        error:"Error while Creating a new note"
    })
    return;
  }

}

export const getAllNotes= async (req:Request,res:Response):Promise<void>=>{
   try {
    const notes= await prisma.note.findMany({
        where:{
            userId:req.userId ,
            trashed:false
        }
    })


    res.status(HTTP_STATUS.OK).json({
        message:"Fetched all notes successfully!",
        notes:notes,
        exist:notes.length>0
    })
    return;
   } catch (error) {
    console.log("Error while fetching all Notes :",error);
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        error:"Error while fetching all notes"
    })
    return;
   }
}


export const getSingleNote=async (req:Request,res:Response):Promise<void>=>{
 const noteId = req.params.noteId;
   try {
    const note= await prisma.note.findFirst({
        where:{
            noteId:noteId,
            userId:req.userId,
            trashed:false
        }
    })
    if(!note){
        res.status(HTTP_STATUS.NOT_FOUND).json({
            message:"No Notes found in active file or not exist",
            exist:false
        })

        return;
    }

    res.status(HTTP_STATUS.OK).json({
        message:"Fetched a note successfully!",
        note:note
    })
    return;
   } catch (error) {
    console.log("Error while fetching a single note :",error);
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        error:"Error while fetching a single note"
    })
    return;
   }
}

export const updateSingleNote = async (req:Request,res:Response):Promise<void>=>{
 const noteId= req.params.noteId;
 const data= req.body;
   try {
    const note= await prisma.note.findFirst({
        where:{
            noteId:noteId ,
            userId:req.userId,
            trashed:false
        }
    })
    if(!note){
        res.status(HTTP_STATUS.NOT_FOUND).json({
            message:"No Notes found",
            exist:false
        })

        return;
    }

   const updatedNote= await prisma.note.update({
    where:{
        noteId:noteId
    },
    data:{
       title:data?.title ?? note.title,
       content:data?.content ?? note.content,
    }
   })

   res.status(HTTP_STATUS.OK).json({
    message:"Updated Successfully",
    note:updatedNote
   })
   return;
   } catch (error) {
    console.log("Error while updating a single note :",error);
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        error:"Error while updating a single note"
    })
    return;
   }
}