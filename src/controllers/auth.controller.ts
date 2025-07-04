import { Request, Response } from "express";
import { HTTP_STATUS } from "../constants/httpStatus";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken";
import { prisma } from "../utils/prisma";



const JWT_SECRET= process.env.JWT_SECRET ||"development"

export const registerUser = async (req: Request, res: Response):Promise<void> => {
  const data =req.body;

    const alreadyExist = await prisma.user.findUnique({
      where:{
         email:data.email
      }
    });

    if (alreadyExist) {
     res.status(HTTP_STATUS.CONFLICT).json({
         error:"Email Already Exist",
         exist:true
      })
      return;
    } else {
      
      try {
         const salt =await bcrypt.genSalt(10);
         const hashedPassword = await bcrypt.hash(data.password,salt);
         const newUser= await prisma.user.create({
            data:{
               fname:data.fname,
               lname:data.lname,
               email:data.email,
               password:hashedPassword 

            }
         })

         const token = jwt.sign({userId:newUser.id},JWT_SECRET,{
            expiresIn:"15m"
         })

         res.cookie("token", token,{
            httpOnly:true,
            secure:true,
            sameSite:"none",//need to be strict=> same origin lax=> get req from other origin or "none"=> allows cross-site cookie
            maxAge:24 * 60 * 60 * 1000,//15 minutes
         })
         
         res.status(HTTP_STATUS.CREATED).json({
            message:"User registered successfully",
            token,
            user:{
               id:newUser.id,
               email:newUser.email,
               fname:newUser.fname,
               lname:newUser.lname,
              
            }
         })
         return;
      } catch (error) {
         console.log("Register error :",error);
         res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            error:"Something went wrong while Register"
         })
         return;
      }
    }

};

export const signinUser = async (req: Request, res: Response):Promise<void> => {
  const data= req.body;
  const alreadyExist= await prisma.user.findUnique({
   where:{
      email:data.email
   }
  })

  if(!alreadyExist){
     res.status(HTTP_STATUS.NOT_FOUND).json({
      message:"Email doesn't exist Register First",
      exist:false
     })
     return;
  }
try {
  

   const isMatch= await bcrypt.compare(data.password,alreadyExist.password);
   if(!isMatch){
      res.status(HTTP_STATUS.BAD_REQUEST).json({
         message:"Incorrect password"
      })
      return;
   }
      const token=jwt.sign({userId:alreadyExist.id},JWT_SECRET,{
         expiresIn:"15m"
      })
      
      res.cookie("token",token,{
         httpOnly:true,
         secure:true,
         sameSite:"none",
         maxAge:24 * 60 * 60 * 1000
      })

      res.status(HTTP_STATUS.OK).json({
         message:"Logged in successfully",
         token,
         user:{
            id:alreadyExist.id,
            email:alreadyExist.email,
            fname:alreadyExist.fname,
            lname:alreadyExist.lname
         }
      })
      return;

   
} catch (error) {
   console.log("Sign Up eror: ",error);
   res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      error:"Something Went Wron while Signing in"
   })
   return;
}

};

export const logoutUser = async (req: Request, res: Response) => {
  res.clearCookie("token",{
     httpOnly:true,
     secure:process.env.NODE_ENV==="production",
     sameSite:process.env.NODE_ENV==="production"?"none":"lax",
  })

   res.status(HTTP_STATUS.OK).json({
      message:"Logged Out Successfully"
   })

  //=>if exists check email
  //=> after success remove the token or cookie
  //=> else => you don't have an account
  //else => invalid body
};


export const getCurrentUser = async (req: Request, res: Response):Promise<void> => {
  const userId = req.userId;

  if (!userId) {
    res.status(HTTP_STATUS.UNAUTHORIZED).json({ error: "Unauthorized" });
    return;
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        fname: true,
        lname: true,
      },
    });

    if (!user) {
       res.status(HTTP_STATUS.NOT_FOUND).json({ error: "User not found" });
       return
    }

    res.status(HTTP_STATUS.OK).json({ user });
    return
  } catch (error) {
    console.error("Error in getCurrentUser:", error);
     res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: "Internal Server Error" });
  return
   }
};
